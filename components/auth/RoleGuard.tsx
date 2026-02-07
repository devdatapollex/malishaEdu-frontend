'use client';

import { useAuthStore, UserRole } from '@/store/auth.store';
import { ReactNode } from 'react';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * RoleGuard Component
 * Conditionally renders children based on user's role
 *
 * @example
 * <RoleGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
 *   <AdminPanel />
 * </RoleGuard>
 */
export function RoleGuard({ allowedRoles, children, fallback = null }: RoleGuardProps) {
  const user = useAuthStore((state) => state.user);

  if (!user) return fallback;

  const hasAccess = allowedRoles.includes(user.role);

  if (!hasAccess) {
    return fallback;
  }

  return <>{children}</>;
}
