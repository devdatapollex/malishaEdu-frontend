/**
 * Centralized Route Configuration
 * Managing all application routes in one place to avoid hardcoded strings.
 */
export const ROUTES = {
  // Public Routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',

  // Protected Routes
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',

  // Role-based Routes (examples)
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
  },
  AGENT: {
    DASHBOARD: '/agent/dashboard',
  },
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    APPLICATIONS: '/student/applications',
  },
} as const;

/**
 * List of public routes that do not require authentication.
 * Used by Middleware to allow access.
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.UNAUTHORIZED,
  ROUTES.DASHBOARD, // Whitelisted for starter template development
];

/**
 * Default redirect path after successful login.
 */
export const DEFAULT_LOGIN_REDIRECT = ROUTES.DASHBOARD;
