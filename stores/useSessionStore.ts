import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Full Appwrite user and session types
type Session = {
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

type CurrentUser = {
  $id: string;
  name: string;
  email: string;
};

interface User {
  id: string;
  email: string;
  name?: string;
}

interface SessionState {
  user: User | null;
  token: string | null;
  session: Session | null;
  isLoggedIn: boolean | null;

  loginWithAppwrite: (data: {
    session: Session;
    currentUser: CurrentUser;
  }) => void;

  logout: () => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      immer((set) => ({
        user: null,
        token: null,
        session: null,
        isLoggedIn: null,

        loginWithAppwrite: ({ session, currentUser }) =>
          set((state) => {
            state.user = {
              id: currentUser.$id,
              email: currentUser.email,
              name: currentUser.name,
            };
            state.token = session.$id; // You may use it if needed
            state.session = session;
            state.isLoggedIn = true;
          }),

        logout: () =>
          set((state) => {
            state.user = null;
            state.token = null;
            state.session = null;
            state.isLoggedIn = false;
          }),

        clearSession: () =>
          set((state) => {
            state.user = null;
            state.token = null;
            state.session = null;
            state.isLoggedIn = false;
          }),
      })),
      {
        name: "user-session-store",
        version: 1,
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          session: state.session,
          isLoggedIn: state.isLoggedIn,
        }),
      }
    ),
    {
      name: "useSessionStore",
    }
  )
);
