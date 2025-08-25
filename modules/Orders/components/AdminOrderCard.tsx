"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTableDataStore, Table, TableService } from "@/modules/Tables";
import {
  useOrderDataStore,
  Order,
  useUpdateOrderStatus,
  CARD_STYLES,
  AdminOrderCardHeader,
  AdminOrderCardMetaData,
  AdminOrderCardRenderItemsAndTotal,
  AdminOrderCardCancelModal,
} from "@/modules/Orders";


export default function AdminOrderCard(order : Order) {
  const { tables } = useTableDataStore();
  const { updateOrder } = useOrderDataStore();
  const { mutate: updateOrderStatus, isPending } = useUpdateOrderStatus();
  const [currentTable, setCurrentTable] = useState<Table | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  useEffect(() => {
    const foundTable =TableService.getTable(tables, order.tableId as string);
    setCurrentTable(foundTable);
  }, [tables, order.tableId]);
  const canCancelOrder = (): boolean => {
    return order.status !== "cancelled" && order.status !== "paid";
  };

  const handleOrderCancellation = (): void => {
    if (!canCancelOrder()) return;
    updateOrderStatus(
      { id: order.id, status: "cancelled" },
      {
        onSuccess: () => {
          updateOrder(order.id, { status: "cancelled" });
          toast.success(`Order #${order.invoiceId} cancelled`);
          setShowCancelModal(false);
        },
        onError: () => {
          toast.error(`Failed to cancel order #${order.invoiceId}`);
          setShowCancelModal(false);
        },
      }
    );
  };

  const handleCancelClick = (): void => {
    setShowCancelModal(true);
  };

  return (
    <div
      className={CARD_STYLES.container}
      role="article"
      aria-label={`Order card for invoice ${order.invoiceId}`}
    >
      <AdminOrderCardHeader {...{ order, handleCancelClick, isPending }} />
      <AdminOrderCardMetaData
        {...{ count: order.items.length, currentTable, order }}
      />
      <AdminOrderCardCancelModal
        {...{
          order,
          handleOrderCancellation,
          isPending,
          setShowCancelModal,
          showCancelModal,
        }}
      />
      <AdminOrderCardRenderItemsAndTotal {...order} />
    </div>
  );
}
