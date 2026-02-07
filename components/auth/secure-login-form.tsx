'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { authService } from '@/services/auth.service';
import { useAuthStore, UserRole } from '@/store/auth.store';
import { ROUTES, DEFAULT_LOGIN_REDIRECT } from '@/config/routes';
import { logger } from '@/lib/logger';

const loginSchema = z.object({
  email: z.string().email('Invalid staff email address'),
  password: z.string().min(6, 'Access key must be at least 6 characters'),
});

type LoginValues = z.infer<typeof loginSchema>;

export function SecureLoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const secureLoginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const { user, accessToken } = response.data;

      setAuth(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as UserRole, // Casting since we ensured roles match in config
          permissions: [], // Permissions handled by backend/middleware
        },
        accessToken
      );

      toast.success('Secure session established. Access granted.');
      logger.info(`Staff login successful: ${user.email} Role: ${user.role}`);

      router.push(DEFAULT_LOGIN_REDIRECT);
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      logger.error(`Login error for staff: ${errorMessage}`);
    },
  });

  function onSubmit(values: LoginValues) {
    secureLoginMutation.mutate(values);
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Internal Portal</h2>
        <p className="text-sm text-muted-foreground italic">Authorized Access Only</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Staff Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="staff.name@malishaedu.com" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Key</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="password" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary/90 transition-all font-semibold shadow-lg shadow-primary/20"
            disabled={secureLoginMutation.isPending}
          >
            {secureLoginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Secure Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="bg-muted/30 p-4 rounded-lg border border-primary/5">
        <p className="text-[10px] text-center text-muted-foreground leading-relaxed uppercase tracking-widest">
          By continuing, you agree to MalishaEdu&apos;s internal security policies and monitoring
          systems.
        </p>
      </div>

      <div className="text-center">
        <Link
          href={ROUTES.LOGIN}
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Are you a student? Login here
        </Link>
      </div>
    </div>
  );
}
