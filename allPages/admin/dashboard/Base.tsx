"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import AdminTitle from "@/shared/components/AdminTitle";
import { supabase } from "@/shared/lib/supabase";
import { useUIStore } from "@/store/useUIStore";
import { Divide as Hamburger } from "hamburger-react";
import { formatPrice } from "@/shared/utils/formatPrice";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState([
    { title: "Total Employees", value: 0, icon: "👥" },
    { title: "Orders Today", value: 0, icon: "🛎" },
    { title: "Today's Revenue", value: "₦0", icon: "💰" },
    { title: "Total Menu Items", value: 0, icon: "📦" },
    { title: "Total Categories", value: 0, icon: "🗂" },
    { title: "Total Tables", value: 0, icon: "🪑" },
    { title: "Pending Orders", value: 0, icon: "⏳" },
    { title: "Active Waiters", value: 0, icon: "🧑‍🍳" },
    { title: "Cancelled Orders", value: 0, icon: "❌" },
  ]);
  const [loading, setLoading] = useState(true);
  const { stopLoading, toggleDrawer, drawerOpened } = useUIStore();

  const backgrounds = [
    "bg-amber-600",
    "bg-emerald-950",
    "bg-red-900",
    "bg-blue-950",
    "bg-gray-900",
    "bg-pink-900",
    "bg-purple-900",
    "bg-cyan-700",
    "bg-red-950",
  ];

  // Fetch dashboard stats
  const fetchDashboardData = async () => {
    setLoading(true);

    const { count: totalEmployees } = await supabase
      .from("employees")
      .select("*", { count: "exact", head: true });

    const { count: totalMenuItems } = await supabase
      .from("menu_items")
      .select("*", { count: "exact", head: true });

    const { count: totalCategories } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true });

    const today = new Date();
    const start = new Date(today);
    start.setUTCHours(-1, 0, 0, 0);
    const end = new Date(today);
    end.setUTCHours(22, 59, 59, 999);

    const { data: ordersTodayData } = await supabase
      .from("orders")
      .select("total, status")
      .gte("created_at", start.toISOString())
      .lte("created_at", end.toISOString());

    const ordersToday = ordersTodayData?.length || 0;
    const todaysRevenue =
      ordersTodayData?.reduce(
        (sum, order) =>
          sum + (order.status !== "cancelled" ? order.total : 0),
        0
      ) || 0;
    const pendingOrders =
      ordersTodayData?.filter((o) => o.status === "pending").length || 0;
    const cancelledOrders =
      ordersTodayData?.filter((o) => o.status === "cancelled").length || 0;

    const { data: activeWaitersData } = await supabase
      .from("tables")
      .select("waiter_id")
      .not("waiter_id", "is", null);

    const activeWaiters =
      [...new Set(activeWaitersData?.map((item) => item.waiter_id))].length || 0;

    const { count: totalTables } = await supabase
      .from("tables")
      .select("*", { count: "exact", head: true });

    setDashboardData([
      { title: "Total Employees", value: totalEmployees || 0, icon: "👥" },
      { title: "Orders Today", value: ordersToday, icon: "🛎" },
      {
        title: "Today's Revenue",
        value: formatPrice(todaysRevenue),
        icon: "💰",
      },
      { title: "Total Menu Items", value: totalMenuItems || 0, icon: "📦" },
      { title: "Total Categories", value: totalCategories || 0, icon: "🗂" },
      { title: "Total Tables", value: totalTables || 0, icon: "🪑" },
      { title: "Pending Orders", value: pendingOrders, icon: "⏳" },
      { title: "Active Waiters", value: activeWaiters, icon: "🧑‍🍳" },
      { title: "Cancelled Orders", value: cancelledOrders, icon: "❌" },
    ]);

    setLoading(false);
  };

  // Poll every 5 seconds
  useEffect(() => {
    fetchDashboardData(); // initial load
    const intervalId = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(intervalId); // cleanup
  }, []);

  useEffect(() => {
    if (!loading) stopLoading();
  }, [loading, stopLoading]);

  return (
    <div className="flex flex-col text-white bg-gray-50 h-screen">
      {/* HEADER */}
      <header className="h-16 pr-3 lg:px-4 bg-white z-20 relative flex border-b items-center justify-between border-gray-300">
        <button className="lg:hidden">
          <Hamburger
            size={18}
            color="black"
            toggled={drawerOpened}
            toggle={toggleDrawer}
          />
        </button>
        <AdminTitle title="Dashboard" />
        <Search className="text-black" size={18} />
      </header>

      {/* MAIN CONTENT */}
      <main className="grid flex-1 overflow-y-auto p-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {dashboardData.map((item, idx) => (
          <section
            key={idx}
            className={`${backgrounds[idx]} shadow-lg rounded-xl p-6 flex items-center justify-between text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.01]`}
          >
            <div className="flex flex-col">
              <h3 className="text-sm font-medium opacity-90 mb-1">
                {item.title}
              </h3>
              <p className="text-3xl font-bold">{item.value}</p>
            </div>
            <div
              className={`${backgrounds[idx]} bg-opacity-20 border-4 border-white h-20 w-20 grid place-content-center shrink-0 rounded-full`}
            >
              <span className="text-4xl">{item.icon}</span>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
