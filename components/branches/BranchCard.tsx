'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Branch, branchService } from '@/services/branch.service';
import { Mail, Phone, MapPin, Eye, Trash2, Building2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PermissionGuard } from '@/components/auth/PermissionGuard';
import { DeleteConfirmationDialog } from '@/components/common/DeleteConfirmationDialog';

interface BranchCardProps {
  branch: Branch;
}

export function BranchCard({ branch }: BranchCardProps) {
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => branchService.deleteBranch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      toast.success('Branch deleted successfully');
      setIsDeleteDialogOpen(false);
    },
    onError: (error: unknown) => {
      const apiError = error as { response?: { data?: { message?: string } } };
      toast.error(apiError.response?.data?.message || 'Failed to delete branch');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(branch.id);
  };

  // Generate initials from branch name
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
                {branch.profileImage ? (
                  <Image
                    src={branch.profileImage}
                    alt={branch.branchName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold text-primary">
                    {getInitials(branch.branchName)}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-base leading-tight truncate">
                  {branch.branchName}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{branch.branchID}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <PermissionGuard permission="BRANCHES_DELETE">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </PermissionGuard>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 grow">
          {/* Contact Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span className="truncate">{branch.user.email}</span>
            </div>
            {branch.phoneNumber && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{branch.phoneNumber}</span>
              </div>
            )}
            {branch.address && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="line-clamp-2">{branch.address}</span>
              </div>
            )}
          </div>

          {/* Branch Info */}
          <div className="pt-3 border-t space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                Manager
              </span>
              <span className="font-medium text-foreground bg-muted px-1.5 py-0.5 rounded">
                {branch.user.name}
              </span>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-muted-foreground flex justify-between items-center opacity-70">
            <span>Created: {formatDate(branch.createdAt)}</span>
          </div>

          {/* Actions */}
          <div className="pt-2 mt-auto">
            <Link href={`/dashboard/branches/${branch.id}`} className="block">
              <Button variant="outline" size="sm" className="w-full gap-2 font-semibold">
                <Eye className="h-4 w-4" />
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        itemName={branch.branchName}
        isLoading={deleteMutation.isPending}
        description="This will permanently delete the branch and its associated user account. All students and counselors assigned to this branch will be unassigned."
      />
    </>
  );
}
