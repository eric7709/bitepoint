"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

type AnalyticsTitleProps = {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  bgColor?: string; // outer container bg
  iconBg?: string; // icon wrapper bg
  iconColor?: string; // icon color
  iconSize?: string; // Tailwind size e.g. "w-6 h-6"
  iconWrapperSize?: string; // Tailwind size e.g. "w-12 h-12"
  iconWrapperRadius?: string; // Tailwind radius e.g. "rounded-lg"
};

export default function AnalyticsTitle({
  icon: Icon,
  title,
  subtitle,
  bgColor = "bg-blue-100",
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
  iconSize = "w-6 h-6",
  iconWrapperSize = "w-12 h-12",
  iconWrapperRadius = "rounded-lg",
}: AnalyticsTitleProps) {
  return (
    <div
      className={`flex items-center mb-2 gap-4 rounded-xl border border-gray-200 px-4 py-3 shadow-sm hover:shadow-md transition bg-blue-900`}
    >
      <div
        className={`${iconWrapperSize} flex items-center justify-center shadow-md border border-white/30 ${iconWrapperRadius} bg-blue-400/30 backdrop-blur-2xl `}
      >
        <Icon className={`${iconSize}  text-white`} />
      </div>
      <div className="flex flex-col ">
        <p className="text-base font-semibold text-white">{title}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}
