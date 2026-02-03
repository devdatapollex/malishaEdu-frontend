import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Settings,
  FileText,
  UserCheck,
  Building2,
  BookOpen,
  PieChart,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: string[];
  permission?: string;
}

export const DASHBOARD_MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'branch', 'counselor', 'staff', 'agent', 'student'],
  },
  {
    label: 'Universities',
    href: '/dashboard/universities',
    icon: GraduationCap,
    roles: ['admin'],
  },
  {
    label: 'Branch Management',
    href: '/dashboard/branches',
    icon: Building2,
    roles: ['admin'],
  },
  {
    label: 'Course Catalog',
    href: '/dashboard/courses',
    icon: BookOpen,
    roles: ['admin', 'branch'],
  },
  {
    label: 'Leads Management',
    href: '/dashboard/leads',
    icon: FileText,
    permission: 'lead:manage',
  },
  {
    label: 'Counselors',
    href: '/dashboard/counselors',
    icon: UserCheck,
    roles: ['admin', 'branch'],
  },
  {
    label: 'Users Control',
    href: '/dashboard/users',
    icon: Users,
    roles: ['admin'],
  },
  {
    label: 'Reports',
    href: '/dashboard/reports',
    icon: PieChart,
    roles: ['admin'],
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['admin', 'branch', 'counselor', 'staff', 'agent', 'student'],
  },
];
