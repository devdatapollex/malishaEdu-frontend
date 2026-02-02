'use client';

import { useAuthStore, UserRole } from '@/store/auth.store';
import { ReactNode } from 'react';

interface RoleGuardProps {
  children: ReactNode;
  roles: UserRole[];
  fallback?: ReactNode;
}

/**
 * RoleGuard Component
 * Wraps elements that should only be visible/accessible to specific roles.
 */
export function RoleGuard({ children, roles, fallback = null }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user || !roles.includes(user.role)) {
    return fallback;
  }

  return <>{children}</>;
}
