import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  disabled?: boolean;
}

export function FileDropzone({
  onFilesSelected,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'application/vnd.ms-excel': ['.xls'],
    'text/csv': ['.csv']
  },
  disabled = false
}: FileDropzoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);
    
    if (rejectedFiles.length > 0) {
      const reasons = rejectedFiles.map(file => file.errors[0]?.message).join(', ');
      setError(`Some files were rejected: ${reasons}`);
      return;
    }

    if (acceptedFiles.length > 0) {
      onFilesSelected(acceptedFiles);
    }
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    disabled,
    multiple: true
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
          "hover:border-primary/50 hover:bg-muted/30",
          isDragActive && !isDragReject && "border-primary bg-primary/5",
          isDragReject && "border-destructive bg-destructive/5",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {isDragReject ? (
            <AlertCircle className="h-12 w-12 text-destructive" />
          ) : (
            <FileSpreadsheet className="h-12 w-12 text-muted-foreground" />
          )}
          
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {isDragActive 
                ? isDragReject 
                  ? "File type not supported" 
                  : "Drop files here"
                : "Upload Excel or CSV files"
              }
            </p>
            <p className="text-xs text-muted-foreground">
              Drag & drop files or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports .xlsx, .xls, .csv files up to {Math.round(maxSize / (1024 * 1024))}MB
            </p>
          </div>
        </div>

        {!disabled && (
          <Upload className="absolute top-4 right-4 h-4 w-4 text-muted-foreground" />
        )}
      </div>

      {error && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}