'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, LogOut, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { DASHBOARD_MENU_ITEMS, MenuItem } from '@/constants/menu-items';
import { useRole } from '@/hooks/use-role';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/config/routes';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { hasPermission } = useRole();
  const role = user?.role || 'admin';
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [pathname, setIsOpen]);

  const handleLogout = () => {
    const isStudent = user?.role === 'STUDENT';
    logout();
    router.push(isStudent ? ROUTES.LOGIN : ROUTES.SECURE_LOGIN);
  };

  const filteredMenu = DASHBOARD_MENU_ITEMS.filter((item) => {
    if (role === 'admin') return true;
    if (item.permission && hasPermission(item.permission)) return true;
    if (item.roles && item.roles.includes(role || '')) return true;
    return false;
  });

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
          'border-primary/5', // Branded border
          isCollapsed ? 'w-[80px]' : 'w-[280px]',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo Section */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-primary/5 bg-primary/2">
          {!isCollapsed && (
            <span className="text-xl font-bold tracking-tight text-primary drop-shadow-sm">
              MalishaEdu
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft
              className={cn('h-5 w-5 transition-transform', isCollapsed && 'rotate-180')}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto no-scrollbar">
          {filteredMenu.map((item) => (
            <SidebarItem
              key={item.href}
              item={item}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        {/* Footer / User Profile */}
        <div className="mt-auto border-t p-4">
          <div
            className={cn(
              'flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50',
              isCollapsed && 'justify-center'
            )}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold uppercase">
              {user?.name?.charAt(0) || 'U'}
            </div>
            {!isCollapsed && (
              <div className="flex flex-1 flex-col overflow-hidden">
                <span className="truncate text-sm font-semibold">{user?.name || 'User'}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email || 'user@example.com'}
                </span>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              'mt-2 w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10',
              isCollapsed && 'justify-center px-0'
            )}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({
  item,
  pathname,
  isCollapsed,
}: {
  item: MenuItem;
  pathname: string;
  isCollapsed: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;
  const isActive = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;
  const isChildActive = item.children?.some((child: MenuItem) => pathname === child.href);

  return (
    <div className="space-y-1">
      <div
        className={cn(
          'group relative flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer',
          isActive || isChildActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          isCollapsed && 'justify-center'
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <Link href={hasChildren ? '#' : item.href} className="flex items-center gap-3 flex-1">
          <Icon
            className={cn(
              'h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110',
              isActive || isChildActive
                ? 'text-primary'
                : 'text-muted-foreground group-hover:text-foreground'
            )}
          />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
            </motion.span>
          )}
        </Link>

        {hasChildren && !isCollapsed && (
          <ChevronDown
            className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
          />
        )}

        {(isActive || (isChildActive && !isOpen)) && (
          <div className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r-full shadow-[0_0_10px_rgba(205,7,30,0.5)]" />
        )}
      </div>

      <AnimatePresence>
        {hasChildren && isOpen && !isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden pl-11 space-y-1"
          >
            {item.children?.map((child: MenuItem) => {
              const ChildIcon = child.icon;
              const isChildItemActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200',
                    isChildItemActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <ChildIcon className="h-4 w-4" />
                  <span>{child.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
