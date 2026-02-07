import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Settings,
  FileText,
  Building2,
  BookOpen,
  MessageSquareQuote,
  Newspaper,
  Calendar,
  HelpCircle,
  Globe,
  Mail,
  Heart,
  Files,
  NotebookPen,
  ClipboardList,
  User,
  UsersRound,
  LayoutList,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: string[];
  permission?: string;
  children?: MenuItem[];
}

export const DASHBOARD_MENU_ITEMS: MenuItem[] = [
  // --- Global / Common ---
  {
    label: 'Home',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH', 'COUNSELOR', 'STUDENT'],
  },

  // --- Student Specific ---
  {
    label: 'Wishlist',
    href: '/dashboard/wishlist',
    icon: Heart,
    roles: ['STUDENT'],
  },
  {
    label: 'Documents',
    href: '/dashboard/documents',
    icon: Files,
    roles: ['STUDENT'],
  },
  {
    label: 'Notes',
    href: '/dashboard/notes',
    icon: NotebookPen,
    roles: ['STUDENT'],
  },
  {
    label: 'Tasks',
    href: '/dashboard/tasks',
    icon: ClipboardList,
    roles: ['STUDENT'],
  },

  // --- Shared Management (Admin, Branch & Counselor) ---
  {
    label: 'Universities',
    href: '/dashboard/universities',
    icon: GraduationCap,
    roles: ['SUPER_ADMIN', 'ADMIN'],
  },
  {
    label: 'Course',
    href: '/dashboard/courses',
    icon: BookOpen,
    roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH', 'COUNSELOR'],
  },
  {
    label: 'Students',
    href: '/dashboard/students',
    icon: Users,
    roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH', 'COUNSELOR'],
  },
  {
    label: 'Applications',
    href: '/dashboard/applications',
    icon: FileText,
    roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH', 'COUNSELOR', 'STUDENT'],
  },
  {
    label: 'Lead Pipeline',
    href: '/dashboard/leads',
    icon: LayoutList,
    roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH', 'COUNSELOR'],
  },
  {
    label: 'Consultants',
    href: '/dashboard/consultants',
    icon: UsersRound,
    roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH', 'COUNSELOR'],
  },
  {
    label: 'Academic Settings',
    href: '/dashboard/academic-settings',
    icon: GraduationCap,
    roles: ['SUPER_ADMIN', 'ADMIN'],
    children: [
      { label: 'Classes', href: '/dashboard/academic-settings/classes', icon: Calendar },
      { label: 'Sessions', href: '/dashboard/academic-settings/sessions', icon: LayoutDashboard },
      { label: 'Subjects', href: '/dashboard/academic-settings/subjects', icon: BookOpen },
    ],
  },
  {
    label: 'Our Branches',
    href: '/dashboard/branches',
    icon: Building2,
    roles: ['SUPER_ADMIN', 'ADMIN'],
  },

  // --- Content & Support ---
  {
    label: 'Testimonial',
    href: '/dashboard/testimonials',
    icon: MessageSquareQuote,
    roles: ['SUPER_ADMIN', 'ADMIN'],
  },
  {
    label: 'Blog & Events',
    href: '/dashboard/blog-events',
    icon: Newspaper,
    roles: ['SUPER_ADMIN', 'ADMIN'],
  },
  {
    label: 'Support',
    href: '/dashboard/support',
    icon: HelpCircle,
    roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH', 'COUNSELOR', 'STUDENT'],
    children: [
      { label: 'Tickets', href: '/dashboard/support/tickets', icon: FileText },
      { label: 'FAQ', href: '/dashboard/support/faq', icon: HelpCircle },
      { label: 'Contact Us', href: '/dashboard/support/contact', icon: Mail },
    ],
  },
  {
    label: 'Users Management',
    href: '/dashboard/users',
    icon: Users,
    permission: 'user:manage',
  },
  {
    label: 'Web Management',
    href: '/dashboard/web-management',
    icon: Globe,
    roles: ['SUPER_ADMIN', 'ADMIN'],
  },
  {
    label: 'Mailbox',
    href: '/dashboard/mailbox',
    icon: Mail,
    roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH', 'COUNSELOR'],
  },

  // --- Common Footer Items ---
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH', 'COUNSELOR', 'STUDENT'],
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH', 'COUNSELOR', 'STUDENT'],
  },
];
