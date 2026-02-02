import { ROUTES } from './routes';
import { UserRole } from '@/store/auth.store';

/**
 * Define which routes are accessible by each role.
 * Use '*' for full access (admin).
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ['*'],
  agent: [ROUTES.DASHBOARD],
  student: [ROUTES.DASHBOARD], // Note: Students might be redirected to /student portal
  guest: [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER],
};

/**
 * Additional roles as requested (conceptually)
 * You can add 'branch', 'counselor' to the UserRole type in auth.store.ts
 */

export const isAuthorized = (role: UserRole, path: string): boolean => {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  if (permissions.includes('*')) return true;
  return permissions.some((p) => path.startsWith(p));
};
