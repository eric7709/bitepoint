"use client";
import { useEffect, useState, useRef } from "react";
import {
  Order,
  Invoice,
  CashierOrderCardHeader,
  CashierOrderCardFooter,
  CashierOrderCardItems,
  CashierOrderCardPaymentMethod,
  CashierOrderCardTotal,
  OrderService,
} from "@/modules/Orders";
export default function CashierOrderCard(order: Order) {
  const { waiterName } = order;
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [error, setError] = useState<string>("");
  const invoiceRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (paymentMethod && error) {
      setError("");
    }
  }, [paymentMethod, error]);
  const currentDateTime = OrderService.getCurrentDateTime();

  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col select-none">
        <CashierOrderCardHeader {...order} />
        <CashierOrderCardItems {...order} />
        <div className="flex-1"></div>
        <CashierOrderCardPaymentMethod
          {...{ error, order, paymentMethod, setPaymentMethod }}
        />
        <div className="">
          <CashierOrderCardTotal {...order} />
          <CashierOrderCardFooter
            {...{ order, paymentMethod, setError, error }}
          />
        </div>
      </div>
      <div style={{ display: "none" }}>
        <Invoice
          ref={invoiceRef}
          order={order}
          waiterName={waiterName}
          currentDateTime={currentDateTime}
        />
      </div>
    </>
  );
}
