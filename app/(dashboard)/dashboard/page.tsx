'use client';

import { Users, GraduationCap, FileText, TrendingUp, BookOpen, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch by waiting for mount

  const stats = [
    {
      title: 'Total Students',
      value: '2,854',
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Active Applications',
      value: '452',
      change: '+5.2%',
      icon: FileText,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    {
      title: 'Total Universities',
      value: '124',
      change: '+2',
      icon: GraduationCap,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Weekly Leads',
      value: '84',
      change: '+18.7%',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-10 text-primary-foreground shadow-lg">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h1>
          <p className="mt-2 text-primary-foreground/80 max-w-xl">
            Here&apos;s what&apos;s happening with your education management system today. You have
            12 new applications pending review.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-white/90 transition-colors">
              View Applications
            </button>
            <button className="rounded-lg bg-primary-foreground/10 px-4 py-2 text-sm font-semibold text-primary-foreground backdrop-blur-md hover:bg-primary-foreground/20 transition-colors">
              Generate Report
            </button>
          </div>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 right-20 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="group relative overflow-hidden border-none shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                {stat.title}
              </CardTitle>
              <div
                className={`rounded-lg p-2.5 transition-colors ${stat.bg} group-hover:scale-110 duration-300`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                <span className="text-green-600 font-medium inline-flex items-center bg-green-50 px-1.5 py-0.5 rounded">
                  {stat.change}
                  <ArrowUpRight className="ml-0.5 h-3 w-3" />
                </span>
                <span>from last month</span>
              </p>
            </CardContent>
            {/* Subtle bottom border accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </Card>
        ))}
      </div>

      {/* Main Content Areas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm overflow-hidden">
          <CardHeader className="border-b bg-muted/20 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <button className="text-xs font-medium text-primary hover:underline">View all</button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="group flex items-center gap-4">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center transition-colors group-hover:bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    {i < 5 && (
                      <div className="absolute left-1/2 top-10 h-6 w-0.5 -translate-x-1/2 bg-muted/50" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">
                      New university admission application
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Student John Doe applied to University of Greenwich
                    </p>
                  </div>
                  <div className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-1 rounded capitalize">
                    2m ago
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-none shadow-sm">
          <CardHeader className="border-b bg-muted/20 pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 pt-6">
            <button className="group flex w-full items-center justify-start gap-3 rounded-xl border border-muted-foreground/10 p-4 text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20">
              <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-white/20 transition-colors">
                <Users className="h-5 w-5 text-primary group-hover:text-white" />
              </div>
              <span>Add New User</span>
            </button>
            <button className="group flex w-full items-center justify-start gap-3 rounded-xl border border-muted-foreground/10 p-4 text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20">
              <div className="rounded-lg bg-blue-100 p-2 group-hover:bg-white/20 transition-colors">
                <GraduationCap className="h-5 w-5 text-blue-600 group-hover:text-white" />
              </div>
              <span>Register University</span>
            </button>
            <button className="group flex w-full items-center justify-start gap-3 rounded-xl border border-muted-foreground/10 p-4 text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20">
              <div className="rounded-lg bg-orange-100 p-2 group-hover:bg-white/20 transition-colors">
                <FileText className="h-5 w-5 text-orange-600 group-hover:text-white" />
              </div>
              <span>Create New Lead</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
