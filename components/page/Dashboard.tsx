"use client";
import React from "react";
import { DashboardSidemenu } from "../base-components/dashboard-components/dashboard-sidemenu/DashboardSidemenu";
import { DashboardContent } from "../base-components/dashboard-components/dashboard-content/DashboardContent";

export const Dashboard = () => {
  return (
    <div className="flex gap-3 py-8 contain max-md:flex-col">
      {/* side menu */}
      <DashboardSidemenu />
      {/* main content */}
      <DashboardContent />
    </div>
  );
};
