import { constructMetadata } from '@/utils/metadata.util';
import { StudentLoginForm } from '@/components/auth/student-login-form';

export const metadata = constructMetadata({
  title: 'Student Login',
  description: 'Login to your MalishaEdu student portal to track your applications and documents.',
});

export default function StudentLoginPage() {
  return <StudentLoginForm />;
}
