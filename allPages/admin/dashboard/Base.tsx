"use client";
import { Search } from "lucide-react";
import AdminTitle from "@/modules/Orders/components/AdminTitle";
import { Divide as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { BACKGROUNDS } from "@/modules/Analytics/constants/backgrounds";
import { useDashboard } from "@/modules/Analytics/hooks/useDashboard";
export default function Dashboard() {
  const { drawerOpened, toggleDrawer, dashboardData } = useDashboard();
  return (
    <div className="flex flex-col text-white bg-gray-50 h-screen">
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
      <main className="grid flex-1 overflow-y-auto p-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {dashboardData.map((item, idx) => (
          <section
            key={item.title}
            className={`${BACKGROUNDS[idx]} shadow-lg rounded-xl p-6 flex items-center justify-between text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.01]`}
          >
            <div className="flex flex-col">
              <h3 className="text-sm font-medium opacity-90 mb-1">
                {item.title}
              </h3>
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={item.value}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl font-bold"
                >
                  {item.value}
                </motion.p>
              </AnimatePresence>
            </div>
            <div
              className={`${BACKGROUNDS[idx]} bg-opacity-20 border-4 border-white h-20 w-20 grid place-content-center shrink-0 rounded-full`}
            >
              <span className="text-4xl">{item.icon}</span>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
