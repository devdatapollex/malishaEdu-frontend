import { Student } from '@/services/student.service';
import { GraduationCap, BookOpen, School, Award, FileSpreadsheet } from 'lucide-react';
import { DetailSection, DetailItem } from './DetailSection';
import { Badge } from '@/components/ui/badge';

interface AcademicInfoProps {
  student: Student;
}

export function AcademicInfo({ student }: AcademicInfoProps) {
  return (
    <div className="space-y-6">
      <DetailSection title="Core Academic Summary" icon={GraduationCap} gridCols={3}>
        <DetailItem label="Last Degree" value={student.lastDegree} />
        <DetailItem label="Institute" value={student.instituteName} />
        <DetailItem label="CGPA / Score" value={student.cgpa} />
      </DetailSection>

      {student.qualifications && student.qualifications.length > 0 && (
        <DetailSection title="Educational Background" icon={School} gridCols={1}>
          <div className="space-y-4">
            {student.qualifications.map((qual, index: number) => (
              <div
                key={index}
                className="p-4 rounded-xl border bg-background/50 hover:bg-background transition-colors group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-foreground">{qual.degree}</h4>
                  </div>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {qual.passingYear}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <DetailItem label="Institute" value={qual.board} />
                  <DetailItem label="Result" value={qual.result} />
                  <DetailItem label="Group/Major" value={qual.group} />
                </div>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {student.testScores && student.testScores.length > 0 && (
        <DetailSection title="English Proficiency & Tests" icon={Award} gridCols={1}>
          <div className="flex flex-wrap gap-4">
            {student.testScores.map((score, index: number) => (
              <div
                key={index}
                className="px-5 py-3 rounded-xl border-2 border-primary/10 bg-primary/5 flex items-center gap-4 min-w-[200px]"
              >
                <div className="p-2 rounded-full bg-primary text-white">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-tighter">
                    {score.testType}
                  </p>
                  <p className="text-xl font-black text-foreground leading-none mt-1">
                    {score.score}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DetailSection>
      )}
    </div>
  );
}
