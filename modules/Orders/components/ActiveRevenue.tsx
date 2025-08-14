import { useOrderDataStore } from "../store/useOrderDataStore";

export default function ActiveRevenue() {
  const {counts, totals} = useOrderDataStore()
  return (
    <div className="flex items-center gap-3 text-sm font-medium">
      <p>
        Active Orders: <span className="text-amber-600">{counts.completed + counts.pending}</span>
      </p>
      <p>
        Revenue: <span className="text-green-500">₦{totals.paid.toLocaleString()}</span>
      </p>
    </div>
  );
}
