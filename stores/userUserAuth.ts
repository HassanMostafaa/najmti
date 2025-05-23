import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface User {
  id: string;
  email: string;
  name?: string;
  // add other user fields as needed
}

interface SessionState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;

  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      immer((set) => ({
        user: null,
        token: null,
        isLoggedIn: false,

        login: (user, token) =>
          set((state) => {
            state.user = user;
            state.token = token;
            state.isLoggedIn = true;
          }),

        logout: () =>
          set((state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
          }),

        clearSession: () =>
          set((state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
          }),
      })),
      {
        name: "user-session-store", // localStorage key
        version: 1,
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isLoggedIn: state.isLoggedIn,
        }),
      }
    ),
    {
      name: "useSessionStore", // devtools label
    }
  )
);
