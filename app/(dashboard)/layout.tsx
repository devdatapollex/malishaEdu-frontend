'use client';

import { Sidebar } from '@/components/dashboard/sidebar';
import { ReactNode } from 'react';

/**
 * Shared Dashboard Layout for Admin, Branch, Counselor, and Staff.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Dynamic Sidebar handles permissions automatically */}
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar could be added here */}
        <header className="h-16 border-b bg-card flex items-center px-8 justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">
            Professional Education Management System
          </h2>
          {/* User profile / Logout could go here */}
        </header>

        <div className="p-8 overflow-y-auto w-full">{children}</div>
      </main>
    </div>
  );
}
