import { constructMetadata } from '@/utils/metadata.util';
import { SecureLoginForm } from '@/components/auth/secure-login-form';

export const metadata = constructMetadata({
  title: 'Internal Portal Login',
  description: 'Access the MalishaEdu internal portal. Authorized personnel only.',
  noIndex: true, // Internal portal should not be indexed by search engines
});

export default function SecureLoginPage() {
  return <SecureLoginForm />;
}
