'use client';

import { useState, ReactNode } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar-new';
import { DashboardHeader } from '@/components/dashboard/header';

/**
 * Shared Dashboard Layout for Admin, Branch, Counselor, and Staff.
 * Features a responsive sidebar and a sticky header.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-primary/[0.02]">
      {/* Dynamic Sidebar handles permissions automatically and is responsive */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar with search and user profile */}
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
