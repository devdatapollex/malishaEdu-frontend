import { useAuthStore } from '@/store/auth.store';

/**
 * Custom hook to easily check user roles and permissions in components.
 */
export const useRole = () => {
  const user = useAuthStore((state) => state.user);

  return {
    role: user?.role,
    isAdmin: user?.role === 'admin',
    isAgent: user?.role === 'agent',
    isStudent: user?.role === 'student',
    user,
    permissions: user?.permissions || [],
    hasPermission: (p: string) => {
      if (user?.role === 'admin') return true;
      return user?.permissions.includes(p) || false;
    },
    checkAccess: (allowedRoles: string[]) => allowedRoles.includes(user?.role || ''),
  };
};
