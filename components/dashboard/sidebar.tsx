'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, GraduationCap, Settings, FileText, UserCheck } from 'lucide-react';
import { useRole } from '@/hooks/use-role';

/**
 * Menu items configuration with role/permission requirements.
 */
const MENU_ITEMS = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'agent', 'student'], // Basic common access
  },
  {
    label: 'Manage Universities',
    href: '/dashboard/universities',
    icon: GraduationCap,
    roles: ['admin'],
  },
  {
    label: 'Leads Management',
    href: '/dashboard/leads',
    icon: FileText,
    permission: 'lead:manage', // Custom roles can access this via permission
  },
  {
    label: 'Counselors',
    href: '/dashboard/counselors',
    icon: UserCheck,
    roles: ['admin'],
  },
  {
    label: 'Users Control',
    href: '/dashboard/users',
    icon: Users,
    roles: ['admin'],
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['admin', 'agent', 'student'],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { role, hasPermission } = useRole();

  // Filter menu items based on role OR permission
  const filteredMenu = MENU_ITEMS.filter((item) => {
    if (role === 'admin') return true; // Admins see everything
    if (item.permission && hasPermission(item.permission)) return true;
    if (item.roles && item.roles.includes(role || '')) return true;
    return false;
  });

  return (
    <aside className="w-64 border-r bg-card h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold font-outfit text-primary">MalishaEdu</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {filteredMenu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {role?.[0].toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground capitalize">{role}</span>
            <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">
              {hasPermission('lead:manage') ? 'Lead Manager' : 'Basic Member'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
