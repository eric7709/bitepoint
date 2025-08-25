"use client";
import { Employee } from "@/modules/Employees";
import { OrderService, useOrderDataStore } from "@/modules/Orders";
import { Loader } from "@/components";
import WaiterOrderCard from "./WaiterOrderCard";

type Props = {
  loading: boolean;
  user: Employee | null;
};

export default function WaiterOrdersList({ loading, user }: Props) {
  const { orders } = useOrderDataStore();

  const waiterOrders = OrderService.getWaitersPendingOrders(orders, user);
  return (
    <div className="flex-1 overflow-y-auto space-y-4 mt-4">
      {waiterOrders?.map((order) => (
        <WaiterOrderCard {...order} key={order.id} />
      ))}
    </div>
  );
}
