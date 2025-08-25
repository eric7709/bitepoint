"use client";
import { useSyncTableDataStore } from "@/modules/Tables";
import {
  DateDropdown,
  SearchText,
  StatusDropdown,
  SortDropdown,
  ScalingCircle,
  NotificationDropdown,
  ProfileDropdown,
} from "@/modules/Kitchen";
import {
  OrderPagination,
  OrderService,
  useOrderDataStore,
  usePendingOrderAlarm,
  useOrderDataSyncAndSubscribe,
} from "@/modules/Orders";
import { Logo } from "@/components";
import { formatPrice } from "@/utils";

export default function AdminHeader() {
  const { orders } = useOrderDataStore();
  const total = OrderService.getOrderTotal(orders);
  usePendingOrderAlarm();
  useSyncTableDataStore();
  useOrderDataSyncAndSubscribe();
  return (
    <div className="h-screen flex flex-col">
      <div className="relative z-30">
        <div className="flex px-7 z-30 relative items-center py-2 border-b border-gray-200 justify-between">
          <Logo />
          <div className="flex gap-8 items-center">
            <p className="text-[13px] font-medium">
              Active Orders:{" "}
              <span className="text-sm ml-1 text-emerald-600">{4}</span>
            </p>
            <p className="text-[13px] font-medium">
              Total:{" "}
              <span className="text-sm ml-1 text-blue-600">
                {formatPrice(total)}
              </span>
            </p>
            <NotificationDropdown />
            <ProfileDropdown />
          </div>
        </div>
        <div className="flex items-center mt-3 border-b border-gray-200 pb-3 gap-4 px-7">
          <SearchText />
          <DateDropdown />
          <StatusDropdown />
          <OrderPagination />
          <SortDropdown />
          <ScalingCircle />
        </div>
      </div>
    </div>
  );
}
