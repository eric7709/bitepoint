import { supabase } from "@/shared/lib/supabase";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

type Handlers<T extends { id: string | number }> = {
  onInsert?: (row: T) => void;
  onUpdate?: (row: T) => void;
  onDelete?: (id: T["id"]) => void;
};

export function createRealtimeSubscription<T extends { id: string | number }>(
  table: string,
  handlers: Handlers<T>
) {
  const { onInsert, onUpdate, onDelete } = handlers;
  let channel: ReturnType<typeof supabase.channel> | null = null;

  const subscribe = () => {
    if (channel) supabase.removeChannel(channel);

    channel = supabase
      .channel(`${table}-changes`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload: RealtimePostgresChangesPayload<T>) => {
          const { eventType, new: newRow, old } = payload;
          if (eventType === "INSERT" && newRow) {
            onInsert?.(newRow);
          } else if (eventType === "UPDATE" && newRow) {
            onUpdate?.(newRow);
          } else if (eventType === "DELETE" && old?.id) {
            onDelete?.(old.id);
          }
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log(`✅ Subscribed to ${table} changes`);
        } else if (status === "CLOSED" || status === "CHANNEL_ERROR") {
          console.warn(`⚠️ ${table} channel closed. Retrying in 2s...`);
          setTimeout(subscribe, 2000);
        }
      });
  };

  // initial subscribe
  subscribe();

  // monitor network status
  const handleOnline = () => {
    console.log("🌐 Network reconnected — resubscribing...");
    subscribe();
  };

  const handleOffline = () => {
    console.warn("📴 Network offline — waiting to reconnect...");
  };

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  // heartbeat check
  const heartbeat = setInterval(() => {
    if (!channel || channel.state !== "joined") {
      console.warn(`💔 ${table} heartbeat: lost channel. Reconnecting...`);
      subscribe();
    }
  }, 15000);

  // cleanup
  return () => {
    clearInterval(heartbeat);
    if (channel) supabase.removeChannel(channel);
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}
