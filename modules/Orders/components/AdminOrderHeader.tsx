"use client";
import { AdminTitle, ActiveRevenue } from "@/modules/Orders";
import { Divide as Hamburger } from "hamburger-react";
import { Filter } from "lucide-react";
import { useState } from "react";
import {
  PaymentMethodDropdown,
  SearchText,
  StatusDropdown,
  DateDropdown,
  NotificationDropdown,
  SortDropdown,
  ScalingCircle,
} from "@/modules/Kitchen";
import { useUIStore } from "@/store";

export default function AdminOrderHeader() {
  const { toggleDrawer, drawerOpened } = useUIStore();
  const [isOpened, setOpen] = useState(false);
  return (
    <div className=" z-30 relative ">
      <div className=" hidden lg:block">
        <div className="flex z-40 relative px-3 items-center justify-between h-16 border-b border-gray-300">
          <AdminTitle title="Orders" />
          <div className="flex items-center gap-5">
            <ActiveRevenue />
            <NotificationDropdown />
          </div>
        </div>
        <div className="grid z-30 relative border-b border-gray-300 p-3 gap-3 grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">
          <SearchText />
          <StatusDropdown />
          <DateDropdown />
          <SortDropdown />
          <PaymentMethodDropdown />
          <ScalingCircle removemargin />
        </div>
      </div>
      <div className="lg:hidden">
        <div className="flex h-16 items-center pr-3 justify-between">
          <Hamburger size={18} toggled={drawerOpened} toggle={toggleDrawer} />
          <AdminTitle title="Order Management" />
          <Filter onClick={() => setOpen(!isOpened)} />
        </div>
        <div
          className={`grid ${isOpened ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} duration-300`}
        >
          <div
            className={`grid  border-b duration-300 border-gray-300 ${isOpened ? "p-3 gap-3" : "overflow-hidden"} `}
          >
            <SearchText zIndex="z-[20]" />
            <StatusDropdown zIndex="z-[18]" />
            <DateDropdown zIndex="z-[16]" />
            <SortDropdown zIndex="z-[12]" />
            <PaymentMethodDropdown zIndex="z-[10]" />
            <div className="flex items-center justify-center">
              <ScalingCircle removemargin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
