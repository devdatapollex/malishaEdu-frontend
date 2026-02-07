'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { branchService } from '@/services/branch.service';
import { ROUTES } from '@/config/routes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Loader2,
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  Users,
  UserCog,
  Calendar,
} from 'lucide-react';

interface BranchDetailsPageProps {
  branchId: string;
}

export function BranchDetailsPage({ branchId }: BranchDetailsPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: branch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['branch', branchId],
    queryFn: () => branchService.getBranchById(branchId),
  });

  // Status update mutation
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      branchService.updateBranchStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branch', branchId] });
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      toast.success('Branch status updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update branch status');
    },
  });

  const handleStatusToggle = (checked: boolean) => {
    const newStatus = checked ? 'ACTIVE' : 'INACTIVE';
    statusMutation.mutate({ id: branchId, status: newStatus });
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'default';
      case 'INACTIVE':
        return 'secondary';
      case 'SUSPENDED':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !branch) {
    return (
      <Card className="p-8 text-center">
        <p className="text-destructive">
          Error loading branch: {(error as Error)?.message || 'Branch not found'}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push(ROUTES.BRANCHES.LIST)}
        >
          Back to Branches
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push(ROUTES.BRANCHES.LIST)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{branch.branchName}</h1>
          <p className="text-muted-foreground mt-1">Branch ID: {branch.branchID}</p>
        </div>
        <Badge variant={getStatusVariant(branch.user.status)} className="text-sm">
          {branch.user.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Branch Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Branch Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Branch Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Branch Name</label>
                  <p className="text-base font-medium mt-1">{branch.branchName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Branch ID</label>
                  <p className="text-base font-medium mt-1">{branch.branchID}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </label>
                <p className="text-base">{branch.address}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <p className="text-base">{branch.phoneNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4" />
                    Created Date
                  </label>
                  <p className="text-base">{formatDate(branch.createdAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manager Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Branch Manager
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Manager Name</label>
                  <p className="text-base font-medium mt-1">{branch.user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="text-base font-medium mt-1">{branch.user.role}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <p className="text-base">{branch.user.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Statistics */}
        <div className="space-y-6">
          {/* Statistics Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <UserCog className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Counselors</p>
                    <p className="text-2xl font-bold">{branch.counselors?.length || 0}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p className="text-2xl font-bold">{branch.students?.length || 0}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Status</label>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant={getStatusVariant(branch.user.status)}>{branch.user.status}</Badge>
                </div>
                {/* Status Toggle */}
                <div className="mt-3 pt-3 border-t">
                  <Button
                    variant={branch.user.status === 'ACTIVE' ? 'destructive' : 'default'}
                    size="sm"
                    className="w-full"
                    onClick={() => handleStatusToggle(branch.user.status !== 'ACTIVE')}
                    disabled={statusMutation.isPending}
                  >
                    {statusMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : branch.user.status === 'ACTIVE' ? (
                      'Deactivate Branch'
                    ) : (
                      'Activate Branch'
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Last Updated</label>
                <p className="text-sm mt-1">{formatDate(branch.updatedAt)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
