'use client';

import { useQuery } from '@tanstack/react-query';
import { studentService } from '@/services/student.service';
import { useParams } from 'next/navigation';
import { StudentProfileView } from '@/components/students/profile/StudentProfileView';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserX } from 'lucide-react';
import Link from 'next/link';

export default function StudentDetailPage() {
  const { id } = useParams();

  const {
    data: student,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['student', id],
    queryFn: () => studentService.getSingleStudent(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !student) {
    return <ErrorState error={error} />;
  }

  // Helper to get registrar name for the profile view
  const getRegistrarName = () => {
    if (!student.registeredBy) return 'Self Registered';
    const rb = student.registeredBy;
    return rb.admin?.name || rb.branch?.branchName || rb.name || 'Staff';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/students">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-xl font-bold">Student Profile</h2>
          <p className="text-sm text-muted-foreground">
            Manage and view detailed student information
          </p>
        </div>
      </div>

      <StudentProfileView student={student} registrarName={getRegistrarName()} />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <Skeleton className="h-40 w-full rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Skeleton className="h-96 col-span-1 rounded-2xl" />
        <Skeleton className="h-96 col-span-3 rounded-2xl" />
      </div>
    </div>
  );
}

function ErrorState({ error }: { error: Error }) {
  const message =
    error?.response?.data?.message || "We couldn't find the student record you're looking for.";

  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <div className="bg-destructive/10 p-6 rounded-full mb-6">
        <UserX className="w-16 h-16 text-destructive" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Student Not Found</h3>
      <p className="text-muted-foreground max-w-md mb-8">{message}</p>
      <Button asChild>
        <Link href="/dashboard/students">Return to Student List</Link>
      </Button>
    </div>
  );
}
