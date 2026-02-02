import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * User roles for the platform
 */
export type UserRole = 'student' | 'agent' | 'admin' | 'guest';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[]; // List of specific actions, e.g., ['lead:view', 'lead:edit']
  image?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  hasPermission: (permission: string) => boolean;
}

/**
 * Global Auth Store using Zustand.
 * Persistent storage is used to keep the user logged in after refresh.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),

      hasPermission: (permission) => {
        const state = get();
        if (state.user?.role === 'admin') return true; // Admins have all permissions
        return state.user?.permissions.includes(permission) || false;
      },
    }),
    {
      name: 'malisha-auth-storage', // Key name in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
