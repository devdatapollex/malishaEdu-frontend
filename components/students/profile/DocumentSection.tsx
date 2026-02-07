import { Student } from '@/services/student.service';
import { FileText, Download, Eye, File, FileImage, FileCode } from 'lucide-react';
import { DetailSection } from './DetailSection';
import { Button } from '@/components/ui/button';

interface DocumentSectionProps {
  documents: Student['documents'];
}

export function DocumentSection({ documents }: DocumentSectionProps) {
  const getFileIcon = (fileName?: string) => {
    if (!fileName) return <File className="w-5 h-5 text-muted-foreground" />;
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'svg'].includes(ext || ''))
      return <FileImage className="w-5 h-5 text-blue-500" />;
    if (ext === 'pdf') return <FileText className="w-5 h-5 text-red-500" />;
    return <File className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <DetailSection title="Uploaded Documents" icon={FileText} gridCols={1}>
      {documents && documents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border bg-background/50 flex items-center justify-between group hover:border-primary/30 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/5 transition-colors">
                  {getFileIcon(doc.fileName)}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate text-foreground/80">
                    {doc.title || doc.fileName}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">
                    {doc.fileType || 'Document'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-2xl bg-muted/20">
          <FileCode className="w-12 h-12 mb-2 opacity-20" />
          <p className="text-sm italic">No documents uploaded yet</p>
        </div>
      )}
    </DetailSection>
  );
}
