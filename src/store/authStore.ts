import { create } from 'zustand';
import { AuthState, AuthUser } from '../types/auth.types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  role: null,
  isLoading: true,          
  isAuthenticating: false,
  error: null,

  setSession: (user: AuthUser, token: string) =>
    set({
      user,
      token,
      role: user.role,
      isLoading: false,
      isAuthenticating: false,
      error: null,
    }),

  setToken: (token: string) => set({ token }),

  clearSession: () =>
    set({
      user: null,
      token: null,
      role: null,
      isLoading: false,
      isAuthenticating: false,
      error: null,
    }),

  setLoading: (val: boolean) => set({ isLoading: val }),

  setAuthenticating: (val: boolean) => set({ isAuthenticating: val }),

  setError: (msg: string | null) => set({ error: msg }),
}));
