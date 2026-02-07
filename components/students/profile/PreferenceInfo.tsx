import { Student } from '@/services/student.service';
import { Globe, Clock, Wallet, CheckCircle2 } from 'lucide-react';
import { DetailSection, DetailItem } from './DetailSection';
import { Badge } from '@/components/ui/badge';

interface PreferenceInfoProps {
  student: Student;
}

type Preference = {
  countries?: string;
  intakeYear?: string;
  session?: string;
  subject?: string;
  budget?: string;
};

export function PreferenceInfo({ student }: PreferenceInfoProps) {
  const preferences: Preference = student.preferences?.[0] || {};

  return (
    <div className="space-y-6">
      <DetailSection title="Study Goals & Destinations" icon={Globe} gridCols={2}>
        <DetailItem
          label="Preferred Countries"
          value={
            <div className="flex flex-wrap gap-1.5 mt-1">
              {preferences.countries?.split(',').map((country: string, i: number) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20"
                >
                  {country.trim()}
                </Badge>
              )) || <span className="text-muted-foreground/50 italic">None Selected</span>}
            </div>
          }
        />
        <DetailItem
          label="Intake & Session"
          value={
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>
                {preferences.intakeYear} - {preferences.session}
              </span>
            </div>
          }
        />
        <DetailItem label="Subject of Interest" value={preferences.subject} />
        <DetailItem
          label="Budget Range"
          value={
            <div className="flex items-center gap-2 font-mono text-emerald-600 dark:text-emerald-400">
              <Wallet className="w-4 h-4" />
              <span>{preferences.budget || 'Not specified'}</span>
            </div>
          }
        />
      </DetailSection>

      <DetailSection title="Additional Preferences" icon={CheckCircle2} gridCols={2}>
        <DetailItem label="Course Type" value={student.studyLevel} />
        <DetailItem label="Funding Source" value={student.fundingSource} />
        <DetailItem
          label="Work Experience"
          value={student.workExperience ? `${student.workExperience} Years` : 'Fresh Graduate'}
        />
        <DetailItem
          label="Gap Year"
          value={student.gapYear ? `${student.gapYear} Years` : 'No Gap'}
        />
      </DetailSection>
    </div>
  );
}
