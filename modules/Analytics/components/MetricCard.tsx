"use client";
import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { MetricValue } from "../types/analytics";
import { formatPrice } from "@/utils";

type Props = {
  metric: MetricValue;
};

export default function MetricCard({ metric }: Props) {
  const { total, percentageChange, title } = metric;

  const formatTotal = () => {
    if (title.includes("revenue") || title.includes("value")) {
      return formatPrice(total);
    }
    if (title.includes("orders")) {
      return total.toLocaleString();
    }
    if (title.includes("rate")) {
      return `${total.toFixed(2)}`;
    }
    return total.toLocaleString();
  };

  const getSubtitle = () => {
    switch (title.toLowerCase()) {
      case "total revenue":
        return "Total earnings";
      case "total orders":
        return "Orders served";
      case "average order value":
        return "Per order";
      case "table turnover rate":
        return "Tables per day";
      default:
        return "This period";
    }
  };

  const formatPercentageChange = () => {
    if (percentageChange === 0) return "0.0";
    const formatted = Math.abs(percentageChange).toFixed(1);
    return percentageChange > 0 ? `+${formatted}` : `-${formatted}`;
  };

  const getTrendDisplay = () => {
    if (percentageChange > 0) {
      return {
        icon: <ArrowUpRight className="w-3 h-3 text-emerald-500" />,
        badge: "bg-emerald-100",
      };
    } else if (percentageChange < 0) {
      return {
        icon: <ArrowDownRight className="w-3 h-3 text-red-500" />,
        badge: "bg-red-100",
      };
    }
    return {
      icon: <Minus className="w-3 h-3 text-gray-500" />,
      badge: "bg-gray-100",
    };
  };

  const trendDisplay = getTrendDisplay();

  return (
    <div className="relative rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="relative z-10 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
              {title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{getSubtitle()}</p>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${trendDisplay.badge}`}>
            {trendDisplay.icon}
            <span className={`text-xs font-semibold ${percentageChange > 0 ? 'text-emerald-600' : percentageChange < 0 ? 'text-red-600' : 'text-gray-600'}`}>
              {formatPercentageChange()}%
            </span>
          </div>
        </div>

        {/* Value */}
        <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          {formatTotal()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">vs Last Period</span>
          <div className="w-12 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentageChange > 0
                  ? "bg-emerald-500"
                  : percentageChange < 0
                  ? "bg-red-500"
                  : "bg-gray-400"
              }`}
              style={{ width: `${Math.min(Math.abs(percentageChange), 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}