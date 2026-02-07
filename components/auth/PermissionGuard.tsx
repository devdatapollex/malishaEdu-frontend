'use client';

import { useAuthStore } from '@/store/auth.store';
import { PERMISSIONS, Permission } from '@/config/permissions.config';
import { ReactNode } from 'react';

interface PermissionGuardProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * PermissionGuard Component
 * Conditionally renders children based on user's permission
 *
 * @example
 * <PermissionGuard permission="STUDENTS_CREATE">
 *   <Button>Add Student</Button>
 * </PermissionGuard>
 */
export function PermissionGuard({ permission, children, fallback = null }: PermissionGuardProps) {
  const user = useAuthStore((state) => state.user);

  if (!user) return fallback;

  const allowedRoles = PERMISSIONS[permission];
  const hasAccess = allowedRoles.includes(user.role);

  if (!hasAccess) {
    return fallback;
  }

  return <>{children}</>;
}
