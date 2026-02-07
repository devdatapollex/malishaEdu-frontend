import { useAuthStore } from '@/store/auth.store';
import { PERMISSIONS, Permission } from '@/config/permissions.config';

/**
 * Hook to check if current user has a specific permission
 *
 * @example
 * const canCreateStudent = usePermission('STUDENTS_CREATE');
 *
 * if (canCreateStudent) {
 *   // Show create button
 * }
 */
export function usePermission(permission: Permission): boolean {
  const user = useAuthStore((state) => state.user);

  if (!user) return false;

  const allowedRoles = PERMISSIONS[permission];
  return allowedRoles.includes(user.role);
}
