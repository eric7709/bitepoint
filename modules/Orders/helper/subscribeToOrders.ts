import { normalizeOrder } from "../utils/normalizeOrder";
import { useOrderDataStore } from "../store/useOrderDataStore";
import { createRealtimeSubscription } from "@/utils";
import { Order } from "@/modules/Orders";

export const subscribeToOrders = () => {
  const { addOrder, updateOrder, removeOrder } = useOrderDataStore.getState();
  return createRealtimeSubscription<Order>("orders", {
    onInsert: (row) => addOrder(normalizeOrder(row)),
    onUpdate: (row) => updateOrder(row.id, normalizeOrder(row)),
    onDelete: (id) => removeOrder(id),
  });
};
