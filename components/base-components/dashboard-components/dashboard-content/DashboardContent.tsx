"use client";
import { useDashboardStore } from "@/stores/useDashboardStore";
import React from "react";
import { DashboardUsers } from "./DashboardUsers";

export const DashboardContent = () => {
  const { selectedTab } = useDashboardStore();

  return (
    <div className="w-3/4 max-md:w-full">
      {selectedTab?.tab === "users" && <DashboardUsers />}
    </div>
  );
};
