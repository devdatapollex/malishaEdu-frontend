import { useAuthStore } from '@/store/auth.store';

/**
 * Custom hook to easily check user roles and permissions in components.
 */
export const useRole = () => {
  const user = useAuthStore((state) => state.user);

  return {
    role: user?.role,
    isAdmin: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    isBranch: user?.role === 'BRANCH',
    isCounselor: user?.role === 'COUNSELOR',
    isStudent: user?.role === 'STUDENT',
    user,
    permissions: user?.permissions || [],
    hasPermission: (p: string) => {
      if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') return true;
      return user?.permissions.includes(p) || false;
    },
    checkAccess: (allowedRoles: string[]) => allowedRoles.includes(user?.role || ''),
  };
};
