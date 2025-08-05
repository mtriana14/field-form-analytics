import React, { useState } from 'react';
import { Upload, Download, FileSpreadsheet } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileDropzone } from './FileDropzone';
import { UploadProgress, UploadStatus } from './UploadProgress';
import { useToast } from '@/hooks/use-toast';

interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FileUploadDialog({ open, onOpenChange }: FileUploadDialogProps) {
  const [uploads, setUploads] = useState<UploadStatus[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFilesSelected = async (files: File[]) => {
    const newUploads: UploadStatus[] = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      fileName: file.name,
      status: 'pending' as const,
      progress: 0,
      size: file.size
    }));

    setUploads(prev => [...prev, ...newUploads]);
    setIsUploading(true);

    // Simulate upload process
    for (const upload of newUploads) {
      await simulateUpload(upload);
    }

    setIsUploading(false);
    toast({
      title: "Upload Complete",
      description: `Successfully processed ${files.length} file(s)`
    });
  };

  const simulateUpload = async (upload: UploadStatus) => {
    // Update to uploading
    setUploads(prev => prev.map(u => 
      u.id === upload.id ? { ...u, status: 'uploading' as const } : u
    ));

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploads(prev => prev.map(u => 
        u.id === upload.id ? { ...u, progress } : u
      ));
    }

    // Processing phase
    setUploads(prev => prev.map(u => 
      u.id === upload.id ? { ...u, status: 'processing' as const, progress: 100 } : u
    ));

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Complete
    setUploads(prev => prev.map(u => 
      u.id === upload.id ? { ...u, status: 'completed' as const } : u
    ));
  };

  const handleRemoveUpload = (id: string) => {
    setUploads(prev => prev.filter(u => u.id !== id));
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Template Download",
      description: "Excel template will be downloaded shortly"
    });
    // In a real implementation, this would trigger a template download
  };

  const handleClose = () => {
    if (!isUploading) {
      setUploads([]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="h-5 w-5" />
            <span>Upload Schedule Files</span>
          </DialogTitle>
          <DialogDescription>
            Upload Excel or CSV files containing delivery schedules and employee data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Supported formats: Excel (.xlsx, .xls), CSV (.csv)
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadTemplate}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download Template</span>
            </Button>
          </div>

          <FileDropzone
            onFilesSelected={handleFilesSelected}
            disabled={isUploading}
          />

          <UploadProgress
            uploads={uploads}
            onRemove={handleRemoveUpload}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Close'}
          </Button>
          {uploads.some(u => u.status === 'completed') && (
            <Button onClick={handleClose}>
              View Dashboard
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}