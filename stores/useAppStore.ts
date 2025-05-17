import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AppState {
  count: number;
  username: string;

  // Actions
  increment: () => void;
  setUsername: (name: string) => void;
  reset: () => void;
}

// ✅ 2. Create store using Zustand with middleware
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      immer((set) => ({
        count: 0,
        username: "",

        increment: () =>
          set((state) => {
            state.count += 1;
          }),

        setUsername: (name) =>
          set((state) => {
            state.username = name;
          }),

        reset: () =>
          set((state) => {
            state.count = 0;
            state.username = "";
          }),
      })),
      {
        name: "zustand-app-store", // 🧠 localStorage key
        version: 1,
        partialize: (state) => ({
          // 💾 Only persist selected values
          count: state.count,
          username: state.username,
        }),
      }
    ),
    {
      name: "useAppStore", // 📈 Devtools label
    }
  )
);
