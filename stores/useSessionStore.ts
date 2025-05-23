import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Session type (based on the object you provided)
export type Session = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  userId: string;
  expire: string;
  provider: string;
  providerUid: string;
  providerAccessToken: string;
  providerAccessTokenExpiry: string;
  providerRefreshToken: string;
  ip: string;
  osCode: string;
  osName: string;
  osVersion: string;
  clientType: string;
  clientCode: string;
  clientName: string;
  clientVersion: string;
  clientEngine: string;
  clientEngineVersion: string;
  deviceName: string;
  deviceBrand: string;
  deviceModel: string;
  countryCode: string;
  countryName: string;
  current: boolean;
  factors: string[];
  secret: string;
  mfaUpdatedAt: string;
};

// Store interface
interface SessionState {
  session: Session | null;
  isLoggedIn: boolean;

  login: (session: Session) => void;
  logout: () => void;
  clearSession: () => void;
}

// Zustand store
export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      immer((set) => ({
        user: null,
        token: null,
        session: null,
        isLoggedIn: false,

        login: (session) =>
          set((state) => {
            state.session = session;
            state.isLoggedIn = true;
          }),

        logout: () =>
          set((state) => {
            state.session = null;
            state.isLoggedIn = false;
          }),

        clearSession: () =>
          set((state) => {
            state.session = null;
            state.isLoggedIn = false;
          }),
      })),
      {
        name: "user-session-store", // localStorage key
        version: 1,
        partialize: (state) => ({
          session: state.session,
          isLoggedIn: state.isLoggedIn,
        }),
      }
    ),
    {
      name: "useSessionStore", // Devtools label
    }
  )
);
