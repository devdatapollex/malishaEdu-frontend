import { Student } from '@/services/student.service';
import { UserCheck, Building2, UserCog, CalendarClock, History } from 'lucide-react';
import { DetailSection, DetailItem } from './DetailSection';

interface ManagementSectionProps {
  student: Student;
}

export function ManagementSection({ student }: ManagementSectionProps) {
  return (
    <DetailSection title="Administrative Tracking" icon={History} gridCols={2}>
      <DetailItem
        label="Registration Source"
        value={
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-primary" />
            <span className="font-bold">{student.registrarName || 'Self Registered'}</span>
          </div>
        }
      />

      <DetailItem
        label="Management Branch"
        value={
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-500" />
            <span>{student.branch?.branchName || 'Not Assigned'}</span>
          </div>
        }
      />

      <DetailItem
        label="Assigned Counselor"
        value={
          <div className="flex items-center gap-2">
            <UserCog className="w-4 h-4 text-emerald-500" />
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              {student.counselor?.user?.name || 'Unassigned'}
            </span>
          </div>
        }
      />

      {student.assignedBy && (
        <DetailItem
          label="Assignment Meta"
          value={
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarClock className="w-3.5 h-3.5" />
              <span>
                Assigned by {student.assignedBy.name} on{' '}
                {student.assignedAt ? new Date(student.assignedAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          }
        />
      )}
    </DetailSection>
  );
}
