import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  authStatus: boolean;
  token: string | null;
  userId: string | null;
  addAuth: (token: string, userId: string) => void;
  removeAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authStatus: false,
      token: null,
      userId: null,
      addAuth: (token, userId) =>
        set({
          authStatus: true,
          token: token,
          userId: userId,
        }),
      removeAuth: () =>
        set({
          authStatus: false,
          token: null,
          userId: null,
        }),
    }),
    { name: "auth-storage" }
  )
);

export { useAuthStore };
