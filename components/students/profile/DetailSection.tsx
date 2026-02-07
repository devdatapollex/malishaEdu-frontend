import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DetailSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  gridCols?: 1 | 2 | 3 | 4;
}

export function DetailSection({
  title,
  icon: Icon,
  children,
  className,
  gridCols = 2,
}: DetailSectionProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[gridCols];

  return (
    <Card className={cn('shadow-sm border-none bg-muted/30 h-full', className)}>
      <CardHeader className="pb-3 flex flex-row items-center gap-2 space-y-0 border-b bg-background/50 py-3 mb-4">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-5 h-5" />
        </div>
        <CardTitle className="text-base font-bold uppercase tracking-wider text-muted-foreground/80">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn('grid gap-y-4 gap-x-8', gridClass)}>{children}</div>
      </CardContent>
    </Card>
  );
}

interface DetailItemProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function DetailItem({ label, value, className }: DetailItemProps) {
  return (
    <div className={cn('space-y-1 group', className)}>
      <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-tight">
        {label}
      </p>
      <div className="text-sm font-medium text-foreground min-h-2">
        {value || <span className="text-muted-foreground/30 italic font-normal">Not Provided</span>}
      </div>
    </div>
  );
}
