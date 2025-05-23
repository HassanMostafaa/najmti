/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { DashboardSidemenuItem } from "./DashboardSidemenuItem";
import { useDashboardStore } from "@/stores/useDashboardStore";

export const DashboardSidemenu = () => {
  const { setSelectedTab, selectedTab } = useDashboardStore();

  const tabItems = [
    {
      label: "Users",
      action: () => setSelectedTab({ tab: "users", ix: 0 }),
    },
    {
      label: "Settings",
      action: () => setSelectedTab({ tab: "settings", ix: 1 }),
    },
    {
      label: "Profile",
      action: () => setSelectedTab({ tab: "profile", ix: 2 }),
    },
    {
      label: "Logout",
      action: () => setSelectedTab({ tab: "logout", ix: 3 }),
    },
  ];

  return (
    <div className="w-1/4 max-w-[350px] max-md:w-full border-e border-neutral-300 px-2 max-md:max-w-full">
      {tabItems && tabItems?.length > 0 && (
        <div className="flex flex-col gap-2">
          {tabItems.map((item, index) => (
            <DashboardSidemenuItem
              key={index}
              selected={selectedTab?.ix === index}
              text={item.label}
              action={item.action}
            />
          ))}
        </div>
      )}
    </div>
  );
};
