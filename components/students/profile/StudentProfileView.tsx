import { Student } from '@/services/student.service';
import { ProfileHeader } from './ProfileHeader';
import { AcademicInfo } from './AcademicInfo';
import { PreferenceInfo } from './PreferenceInfo';
import { DocumentSection } from './DocumentSection';
import { ManagementSection } from './ManagementSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, GraduationCap, Globe, FileText, Settings } from 'lucide-react';
import { DetailSection, DetailItem } from './DetailSection';

interface StudentProfileViewProps {
  student: Student;
  registrarName: string;
}

export function StudentProfileView({ student, registrarName }: StudentProfileViewProps) {
  return (
    <div className="space-y-6 pb-10">
      {/* Top Header Card */}
      <ProfileHeader student={student} registrarName={registrarName} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          <DetailSection title="Personal Info" icon={User} gridCols={1}>
            <DetailItem label="Full Name" value={student.user?.name || 'N/A'} />
            <DetailItem
              label="Date of Birth"
              value={
                student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : null
              }
            />
            <DetailItem label="Gender" value={student.gender} />
            <DetailItem label="Nationality" value={student.nationality} />
            <DetailItem label="Passport No" value={student.passportNo} />
            <DetailItem label="NID/UID" value={student.nid} />
          </DetailSection>
        </div>

        {/* Right Main Content - Tabbed Interface */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="academic" className="w-full">
            <TabsList className="w-full justify-start h-12 bg-muted/50 p-1 mb-6">
              <TabsTrigger
                value="academic"
                className="gap-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <GraduationCap className="w-4 h-4" />
                Academic
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="gap-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Globe className="w-4 h-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="gap-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <FileText className="w-4 h-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="management"
                className="gap-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Settings className="w-4 h-4" />
                Management
              </TabsTrigger>
            </TabsList>

            <div className="min-h-[500px]">
              <TabsContent value="academic" className="mt-0 focus-visible:outline-none">
                <AcademicInfo student={student} />
              </TabsContent>

              <TabsContent value="preferences" className="mt-0 focus-visible:outline-none">
                <PreferenceInfo student={student} />
              </TabsContent>

              <TabsContent value="documents" className="mt-0 focus-visible:outline-none">
                <DocumentSection documents={student.documents || []} />
              </TabsContent>

              <TabsContent value="management" className="mt-0 focus-visible:outline-none">
                <ManagementSection student={student} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
