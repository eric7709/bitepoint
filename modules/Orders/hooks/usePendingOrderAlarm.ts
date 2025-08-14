"use client";

import { useEffect, useRef } from "react";
import { useOrderDataStore } from "@/modules/Orders/store/useOrderDataStore";
import { playCustomBeep } from "@/shared/utils/playCustomBeep";
import { supabase } from "@/shared/lib/supabase";
import { Order } from "../types/orders";

export function usePendingOrderAlarm() {
  const { counts, fetchOrders, addOrder, updateOrder, removeOrder } =
    useOrderDataStore();
  const timeoutRef = useRef<number | null>(null);
  const heartbeatRef = useRef<number | null>(null);

  useEffect(() => {

    // 🔔 Beep loop with setTimeout (prevents sleep)
    const beepLoop = () => {
      playCustomBeep({ frequency: 1200, duration: 0.5, volume: 0.2 });
      if (useOrderDataStore.getState().counts.pending > 0) {
        timeoutRef.current = window.setTimeout(beepLoop, 2000);
      } else {
        timeoutRef.current = null;
      }
    };

    if (counts.pending > 0 && timeoutRef.current === null) {
      beepLoop();
    }

    // 🔄 Supabase realtime listener
    const channel = supabase
      .channel("orders-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => addOrder(payload.new as Order)
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => updateOrder(payload.new.id, payload.new)
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "orders" },
        (payload) => removeOrder(payload.old.id)
      )
      .subscribe();

    // 📶 On reconnect, fetch orders
    const handleOnline = () => {
      console.log("✅ Network back online — refreshing orders");
      fetchOrders();
    };
    window.addEventListener("online", handleOnline);

    // ❤️ Heartbeat: fetch orders every 30s to keep alive
    const startHeartbeat = () => {
      heartbeatRef.current = window.setInterval(() => {
        console.log("⏳ Heartbeat: refreshing orders");
        fetchOrders();
      }, 30000);
    };
    startHeartbeat();

    return () => {
      // Cleanup beep loop
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      // Cleanup heartbeat
      if (heartbeatRef.current !== null) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }
      // Cleanup event + Supabase
      window.removeEventListener("online", handleOnline);
      supabase.removeChannel(channel);
    };
  }, [counts.pending, fetchOrders, addOrder, updateOrder, removeOrder]);
}
