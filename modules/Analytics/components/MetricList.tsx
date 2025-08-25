"use client";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";
import MetricCard from "./MetricCard";

export default function MetricList() {
  const { analytics } = useAnalyticsDataStore();
  const metrics = analytics?.metrics;
  if (!metrics) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
      {metrics.map((metric, track) => (
        <MetricCard key={track} {...{ metric, track }} />
      ))}
    </div>
  );
}
