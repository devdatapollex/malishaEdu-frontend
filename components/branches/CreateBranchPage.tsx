'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { branchService } from '@/services/branch.service';
import { ROUTES } from '@/config/routes';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, ArrowLeft, Save } from 'lucide-react';

const createBranchSchema = z.object({
  // User Information
  name: z.string().min(1, 'Manager name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional()
    .or(z.literal('')),

  // Branch Information
  branchName: z.string().min(1, 'Branch name is required'),
  address: z.string().min(1, 'Address is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  profileImage: z.string().optional().or(z.literal('')),
});

type CreateBranchValues = z.infer<typeof createBranchSchema>;

export function CreateBranchPage() {
  const router = useRouter();

  const form = useForm<CreateBranchValues>({
    resolver: zodResolver(createBranchSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      branchName: '',
      address: '',
      phoneNumber: '',
      profileImage: '',
    },
  });

  const createMutation = useMutation({
    mutationFn: branchService.createBranch,
    onSuccess: () => {
      toast.success('Branch created successfully');
      router.push(ROUTES.BRANCHES.LIST);
    },
    onError: (error: Error) => {
      const errorMessage = (error as { message?: string }).message || 'Failed to create branch';

      if (
        errorMessage.includes('email') ||
        errorMessage.includes('duplicate') ||
        errorMessage.includes('unique')
      ) {
        toast.error('A user with this email already exists');
      } else {
        toast.error(errorMessage);
      }
    },
  });

  function onSubmit(values: CreateBranchValues) {
    const data = {
      name: values.name,
      email: values.email,
      ...(values.password && values.password.length > 0 ? { password: values.password } : {}),
      branch: {
        branchName: values.branchName,
        address: values.address,
        phoneNumber: values.phoneNumber,
        ...(values.profileImage && values.profileImage.length > 0
          ? { profileImage: values.profileImage }
          : {}),
      },
    };

    createMutation.mutate(data);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push(ROUTES.BRANCHES.LIST)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Branch</h1>
          <p className="text-muted-foreground mt-1">
            Fill in the branch details. Fields marked with * are required.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Branch Manager Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Branch Manager Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manager Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manager Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Password (Optional)</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      Leave empty to use default: <code className="text-xs">12345678</code>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Branch Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Branch Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="branchName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Dhaka Main Branch" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+880 1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main Street, Dhaka, Bangladesh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Profile Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>Enter a URL for the branch profile image</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 sticky bottom-0 bg-background py-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(ROUTES.BRANCHES.LIST)}
              disabled={createMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Create Branch
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
