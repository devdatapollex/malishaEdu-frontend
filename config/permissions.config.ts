import { UserRole } from '@/store/auth.store';

export const PERMISSIONS = {
  // Student Management
  STUDENTS_VIEW_ALL: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  STUDENTS_VIEW_OWN: ['ADMIN', 'SUPER_ADMIN', 'COUNSELOR', 'BRANCH'] as UserRole[],
  STUDENTS_CREATE: ['ADMIN', 'SUPER_ADMIN', 'BRANCH'] as UserRole[],
  STUDENTS_EDIT: ['ADMIN', 'SUPER_ADMIN', 'BRANCH'] as UserRole[],
  STUDENTS_DELETE: ['ADMIN', 'SUPER_ADMIN', 'BRANCH'] as UserRole[],

  // University Management
  UNIVERSITIES_VIEW: ['ADMIN', 'SUPER_ADMIN', 'BRANCH', 'COUNSELOR'] as UserRole[],
  UNIVERSITIES_CREATE: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  UNIVERSITIES_EDIT: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  UNIVERSITIES_DELETE: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],

  // Course Management
  COURSES_VIEW: ['ADMIN', 'SUPER_ADMIN', 'BRANCH', 'COUNSELOR'] as UserRole[],
  COURSES_CREATE: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  COURSES_EDIT: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  COURSES_DELETE: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],

  // Application Management
  APPLICATIONS_VIEW_ALL: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  APPLICATIONS_VIEW_OWN: ['ADMIN', 'SUPER_ADMIN', 'BRANCH', 'COUNSELOR', 'STUDENT'] as UserRole[],
  APPLICATIONS_CREATE: ['ADMIN', 'SUPER_ADMIN', 'COUNSELOR', 'STUDENT'] as UserRole[],
  APPLICATIONS_EDIT: ['ADMIN', 'SUPER_ADMIN', 'COUNSELOR'] as UserRole[],
  APPLICATIONS_DELETE: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],

  // Lead Management
  LEADS_VIEW: ['ADMIN', 'SUPER_ADMIN', 'BRANCH', 'COUNSELOR'] as UserRole[],
  LEADS_CREATE: ['ADMIN', 'SUPER_ADMIN', 'BRANCH', 'COUNSELOR'] as UserRole[],
  LEADS_EDIT: ['ADMIN', 'SUPER_ADMIN', 'BRANCH', 'COUNSELOR'] as UserRole[],
  LEADS_DELETE: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],

  // User Management
  USERS_VIEW: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  USERS_CREATE: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  USERS_EDIT: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  USERS_DELETE: ['SUPER_ADMIN'] as UserRole[],

  // Settings
  SETTINGS_VIEW: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  SETTINGS_EDIT: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],

  // Branch Management
  BRANCHES_VIEW: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  BRANCHES_CREATE: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  BRANCHES_EDIT: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
  BRANCHES_DELETE: ['ADMIN', 'SUPER_ADMIN'] as UserRole[],
} as const;

export type Permission = keyof typeof PERMISSIONS;

/**
 * Helper function to check if a role has a specific permission
 */
export function hasPermission(userRole: UserRole | undefined, permission: Permission): boolean {
  if (!userRole) return false;
  return PERMISSIONS[permission].includes(userRole);
}
