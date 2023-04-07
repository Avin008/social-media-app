import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  authStatus: boolean;
  token: string | null;
  addAuth: (token: string) => void;
  removeAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authStatus: false,
      token: null,
      addAuth: (token: string) =>
        set({
          authStatus: true,
          token: token,
        }),
      removeAuth: () =>
        set({
          authStatus: false,
          token: null,
        }),
    }),
    { name: "auth-storage" }
  )
);

export { useAuthStore };
