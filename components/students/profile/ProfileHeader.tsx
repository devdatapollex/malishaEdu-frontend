import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Student } from '@/services/student.service';
import { Mail, Phone, Calendar, MapPin, UserCheck, Building2, UserCog } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

interface ProfileHeaderProps {
  student: Student;
  registrarName: string;
}

export function ProfileHeader({ student, registrarName }: ProfileHeaderProps) {
  const { user } = useAuthStore();
  const isStudent = user?.role === 'STUDENT';

  const getInitials = (name?: string) => {
    if (!name) return 'ST';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="border-none shadow-md overflow-hidden bg-gradient-to-r from-primary/5 via-background to-background">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-primary/10 flex items-center justify-center border-4 border-background shadow-xl">
              <span className="text-3xl md:text-5xl font-bold text-primary">
                {getInitials(student.user?.name)}
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-grow space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                {student.user?.name || 'Unknown Student'}
              </h1>
              <Badge
                variant="outline"
                className="px-2.5 py-0.5 rounded-md font-mono text-xs bg-muted/50 border-primary/20"
              >
                {student.studentID}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary/60" />
                <span className="truncate">{student.user?.email || 'No Email'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary/60" />
                <span>{student.phoneNumber}</span>
              </div>
              {student.nationality && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary/60" />
                  <span>{student.nationality}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary/60" />
                <span>Registered: {new Date(student.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-primary/60" />
                <span className="font-medium text-foreground italic flex gap-1">
                  Created By: <span className="text-primary not-italic">{registrarName}</span>
                </span>
              </div>
              {student.branch && (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary/60" />
                  <span className="font-medium text-foreground">
                    Branch: <span className="text-primary">{student.branch.branchName}</span>
                  </span>
                </div>
              )}
              {student.counselor && (
                <div className="flex items-center gap-2">
                  <UserCog className="w-4 h-4 text-primary/60" />
                  <span className="font-medium text-foreground">
                    Counselor: <span className="text-primary">{student.counselor.user.name}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto mt-4 md:mt-0">
            <Button variant="default" className="flex-grow md:flex-initial shadow-md">
              Edit Profile
            </Button>
            {!isStudent && (
              <Button variant="outline" className="flex-grow md:flex-initial">
                Add Note
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
