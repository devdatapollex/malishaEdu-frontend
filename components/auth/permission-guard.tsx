'use client';

import { useAuthStore } from '@/store/auth.store';
import { ReactNode } from 'react';

interface PermissionGuardProps {
  permission: string;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * PermissionGuard Component
 * Standardizes UI access control based on granular permissions.
 */
export function PermissionGuard({ permission, children, fallback = null }: PermissionGuardProps) {
  const hasPermission = useAuthStore((state) => state.hasPermission);

  if (!hasPermission(permission)) {
    return fallback;
  }

  return <>{children}</>;
}
