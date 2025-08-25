"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CreateOrderButton,
  MenuPageHeader,
  MenuItemList,
  MenuPageSearch,
  MenuPageCategories,
  MenuCartPage,
  OrderSummaryModal,
  MenuDetailsModal,
  CreateCustomerModal,
  useOrderSelectionStore,
} from "@/modules/Orders";
import {
  useSyncCategoryDataStore,
} from "@/modules/Category";
import {
  useSyncTableDataStore,
  Table,
} from "@/modules/Tables";
import { useMenuItemsDataSyncAndSubscribe } from "@/modules/MenuItems";

type Props = {
  table: Table | null;
};
export default function Base(props: Props) {
  const { table } = props;
  const router = useRouter();
  useEffect(() => {
    if (!table) router.push("/table-not-found");
  }, []);
  const { setAllocatedTableId } = useOrderSelectionStore();
  useSyncCategoryDataStore();
  useSyncTableDataStore();
  useMenuItemsDataSyncAndSubscribe();
  useEffect(() => {
    if (table) setAllocatedTableId(table.id);
  }, []);
  return (
    <div className="h-screen fixed inset-0 flex flex-col ">
      <MenuCartPage />
      <OrderSummaryModal />
      <MenuPageHeader />
      <MenuPageSearch />
      <MenuDetailsModal />
      <MenuPageCategories />
      <MenuItemList />
      <CreateOrderButton />
      <CreateCustomerModal />
    </div>
  );
}
