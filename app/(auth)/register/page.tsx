import { Metadata } from 'next';
import { StudentRegisterForm } from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Join MalishaEdu | Student Registration',
  description:
    'Create your student account to access premium education resources and career opportunities.',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <StudentRegisterForm />
    </div>
  );
}
