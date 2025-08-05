import React from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export interface UploadStatus {
  id: string;
  fileName: string;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
  size: number;
}

interface UploadProgressProps {
  uploads: UploadStatus[];
  onRemove?: (id: string) => void;
}

export function UploadProgress({ uploads, onRemove }: UploadProgressProps) {
  if (uploads.length === 0) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadStatus['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
    }
  };

  const getStatusText = (status: UploadStatus['status']) => {
    switch (status) {
      case 'pending':
        return 'Waiting...';
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Upload Progress</h4>
        <span className="text-xs text-muted-foreground">
          {uploads.filter(u => u.status === 'completed').length} of {uploads.length} completed
        </span>
      </div>

      <div className="space-y-3">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className={cn(
              "p-3 rounded-lg border bg-card",
              upload.status === 'error' && "border-destructive/50 bg-destructive/5"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 min-w-0">
                {getStatusIcon(upload.status)}
                <span className="text-sm font-medium truncate">
                  {upload.fileName}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({formatFileSize(upload.size)})
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">
                  {getStatusText(upload.status)}
                </span>
                {onRemove && upload.status !== 'uploading' && upload.status !== 'processing' && (
                  <button
                    onClick={() => onRemove(upload.id)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {(upload.status === 'uploading' || upload.status === 'processing') && (
              <Progress value={upload.progress} className="h-2" />
            )}

            {upload.error && (
              <p className="text-xs text-destructive mt-2">{upload.error}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}