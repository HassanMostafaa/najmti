import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface tabState {
  ix: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tab: any;
}

interface DashboardRouteState {
  setSelectedTab: (tab: tabState) => void;
  selectedTab: tabState | null;
}

// ✅ 2. Create store using Zustand with middleware
export const useDashboardStore = create<DashboardRouteState>()(
  devtools(
    persist(
      immer((set) => ({
        selectedTab: null,
        setSelectedTab: (tab) => {
          set((state) => {
            state.selectedTab = tab;
          });
        },
      })),
      {
        name: "zustand-dashboard-store", // 🧠 localStorage key
        version: 1,
        partialize: (state) => ({
          // 💾 Only persist selected values
          selectedTab: state.selectedTab,
        }),
      }
    )
  )
);
