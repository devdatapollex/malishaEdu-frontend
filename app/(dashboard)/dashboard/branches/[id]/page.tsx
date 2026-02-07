import { BranchDetailsPage } from '@/components/branches';

interface BranchDetailsRouteProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BranchDetailsRoute({ params }: BranchDetailsRouteProps) {
  const { id } = await params;
  return <BranchDetailsPage branchId={id} />;
}
