import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Student, studentService } from '@/services/student.service';
import { branchService } from '@/services/branch.service';
import { counselorService } from '@/services/counselor.service';
import {
  Mail,
  Phone,
  Globe,
  FileText,
  Eye,
  Trash2,
  UserCheck,
  Building2,
  UserCog,
} from 'lucide-react';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PermissionGuard } from '@/components/auth/PermissionGuard';
import { useState } from 'react';
import { DeleteConfirmationDialog } from '@/components/common/DeleteConfirmationDialog';
import { useAuthStore } from '@/store/auth.store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuthStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const isAdmin = currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN';
  const isBranch = currentUser?.role === 'BRANCH';

  // Fetch branches for assignment (only for admins)
  const { data: branchesData } = useQuery({
    queryKey: ['branches'],
    queryFn: () => branchService.getAllBranches(),
    enabled: isAdmin,
  });

  const branches = branchesData?.data;

  // Fetch counselors (filtered by branch if current user is branch or if branch is selected for student)
  const { data: counselors } = useQuery({
    queryKey: ['counselors', student.branchId],
    queryFn: () =>
      counselorService.getAllCounselors({
        branchId: student.branchId || undefined,
      }),
    enabled: (isAdmin || isBranch) && !!student.branchId,
  });

  // Assign branch mutation
  const assignBranchMutation = useMutation({
    mutationFn: (branchId: string) => studentService.assignBranch(student.id, branchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student assigned to branch successfully');
    },
    onError: (error: unknown) => {
      const apiError = error as { response?: { data?: { message?: string } } };
      toast.error(apiError.response?.data?.message || 'Failed to assign branch');
    },
  });

  // Assign counselor mutation
  const assignCounselorMutation = useMutation({
    mutationFn: (counselorId: string) => studentService.assignCounselor(student.id, counselorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student assigned to counselor successfully');
    },
    onError: (error: unknown) => {
      const apiError = error as { response?: { data?: { message?: string } } };
      toast.error(apiError.response?.data?.message || 'Failed to assign counselor');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => studentService.deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student deleted successfully');
      setIsDeleteDialogOpen(false);
    },
    onError: (error: unknown) => {
      const apiError = error as { response?: { data?: { message?: string } } };
      toast.error(apiError.response?.data?.message || 'Failed to delete student');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(student.id);
  };

  const handleAssignBranch = (branchId: string) => {
    assignBranchMutation.mutate(branchId);
  };

  const handleAssignCounselor = (counselorId: string) => {
    assignCounselorMutation.mutate(counselorId);
  };

  // Registrar Display Logic
  const getRegistrarDisplay = () => {
    if (!student.registeredBy) return 'Self Registered';

    const rb = student.registeredBy;
    if (rb.role === 'BRANCH' && rb.branch) {
      return rb.branch.branchName;
    }
    if (rb.role === 'ADMIN' || rb.role === 'SUPER_ADMIN') {
      return rb.admin?.name || rb.name;
    }
    if (rb.role === 'STUDENT') {
      return 'Self Registered';
    }
    return rb.name;
  };

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200 relative group flex flex-col h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-primary">
                  {getInitials(student.user.name)}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-base leading-tight truncate">
                  {student.user.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{student.studentID}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <PermissionGuard permission="STUDENTS_DELETE">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </PermissionGuard>

              {student.documents && student.documents.length > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <FileText className="h-3 w-3" />
                  {student.documents.length}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 grow">
          {/* Contact Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span className="truncate">{student.user.email}</span>
            </div>
            {student.phoneNumber && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{student.phoneNumber}</span>
              </div>
            )}
            {student.nationality && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-4 w-4 shrink-0" />
                <span>{student.nationality}</span>
              </div>
            )}
          </div>

          {/* Source/Registrar Info */}
          <div className="pt-3 border-t space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5" />
                Created By
              </span>
              <span className="font-medium text-foreground bg-muted px-1.5 py-0.5 rounded">
                {getRegistrarDisplay()}
              </span>
            </div>

            {/* Assignments Grid */}
            <div className="grid grid-cols-2 gap-1">
              {/* Branch Assignment */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  Management Branch
                </div>

                {isAdmin ? (
                  <Select
                    value={student.branchId || 'unassigned'}
                    onValueChange={handleAssignBranch}
                    disabled={assignBranchMutation.isPending}
                  >
                    <SelectTrigger className="h-8 text-xs bg-muted/50 border-none hover:bg-muted transition-colors">
                      <SelectValue placeholder="Assign Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned" disabled>
                        Select Branch
                      </SelectItem>
                      {branches?.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.branchName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-[13px] font-medium pl-5 text-indigo-600 dark:text-indigo-400">
                    {student.branch?.branchName || (
                      <span className="text-muted-foreground italic font-normal">Not Assigned</span>
                    )}
                  </div>
                )}
              </div>

              {/* Counselor Assignment */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <UserCog className="h-3.5 w-3.5" />
                  Assigned Counselor
                </div>

                {isAdmin || isBranch ? (
                  <Select
                    value={student.counselorId || 'unassigned'}
                    onValueChange={handleAssignCounselor}
                    disabled={assignCounselorMutation.isPending || !student.branchId}
                  >
                    <SelectTrigger className="h-8 text-xs bg-muted/50 border-none hover:bg-muted transition-colors">
                      <SelectValue
                        placeholder={!student.branchId ? 'Assign Branch First' : 'Assign Counselor'}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned" disabled>
                        Select Counselor
                      </SelectItem>
                      {counselors?.map((counselor) => (
                        <SelectItem key={counselor.id} value={counselor.id}>
                          {counselor.user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-[13px] font-medium pl-5 text-emerald-600 dark:text-emerald-400">
                    {student.counselor?.user?.name || (
                      <span className="text-muted-foreground italic font-normal">Not Assigned</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-muted-foreground flex justify-between items-center opacity-70">
            <span>Reg: {formatDate(student.createdAt)}</span>
            {student.assignedBy && <span className="italic">By {student.assignedBy.name}</span>}
          </div>

          {/* Actions */}
          <div className="pt-2 mt-auto">
            <Link href={`/dashboard/students/${student.id}`} className="block">
              <Button variant="outline" size="sm" className="w-full gap-2 font-semibold">
                <Eye className="h-4 w-4" />
                View Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        itemName={student.user.name}
        isLoading={deleteMutation.isPending}
        description="This will permanently delete the student profile and their associated user account."
      />
    </>
  );
}
