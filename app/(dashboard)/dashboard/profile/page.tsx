'use client';

import { useQuery } from '@tanstack/react-query';
import { studentService } from '@/services/student.service';
import { useAuthStore } from '@/store/auth.store';
import { ProfileDetails } from '@/components/students/profile/ProfileDetails';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { UserX, Mail, Settings, Shield } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export default function ProfilePage() {
  const { user } = useAuthStore();
  const isStudent = user?.role === 'STUDENT';

  const {
    data: student,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['my-profile'],
    queryFn: () => studentService.getStudentProfile(),
    enabled: isStudent,
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (isStudent && (error || !student)) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your Profile</h2>
          <p className="text-sm text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/settings">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
        </Button>
      </div>

      {isStudent && student ? (
        <ProfileDetails
          student={student}
          registrarName={student.registrarName || 'Self Registered'}
        />
      ) : (
        <GenericProfileView user={user} />
      )}
    </div>
  );
}

function GenericProfileView({ user }: { user: AuthUser | null }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1 border-none shadow-md bg-linear-to-b from-primary/5 to-transparent">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-lg">
            <span className="text-3xl font-bold text-primary uppercase">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <Badge variant="outline" className="capitalize">
            {user?.role?.toLowerCase() || 'User'}
          </Badge>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Email Address</p>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary/60" />
                {user?.email}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Role</p>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary/60" />
                {user?.role}
              </div>
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground italic">
              Note: Additional profile details are currently available for Student accounts. Contact
              your administrator for profile updates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-40 w-full rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Skeleton className="h-96 col-span-1 rounded-2xl" />
        <Skeleton className="h-96 col-span-3 rounded-2xl" />
      </div>
    </div>
  );
}

interface QueryError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

function ErrorState({ error }: { error: QueryError | Error | null }) {
  const message =
    (error as QueryError)?.response?.data?.message ||
    (error as Error)?.message ||
    "We couldn't load your profile information. Please complete your registration if you haven't already.";

  return (
    <div className="flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
      <div className="bg-destructive/10 p-6 rounded-full mb-6">
        <UserX className="w-16 h-16 text-destructive" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Profile Not Found</h3>
      <p className="text-muted-foreground max-w-md mb-8">{message}</p>
      <Button asChild>
        <Link href="/dashboard">Return to Home</Link>
      </Button>
    </div>
  );
}
