import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileSpreadsheet, Upload as UploadIcon, Download, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDropzone } from '@/components/upload/FileDropzone';
import { UploadProgress, UploadStatus } from '@/components/upload/UploadProgress';
import { useToast } from '@/hooks/use-toast';

export default function Upload() {
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
  };

  // Mock upload history data
  const uploadHistory = [
    { id: '1', fileName: 'schedule_week_45.xlsx', uploadDate: '2024-01-15', status: 'completed', records: 156 },
    { id: '2', fileName: 'employee_data.csv', uploadDate: '2024-01-14', status: 'completed', records: 89 },
    { id: '3', fileName: 'delivery_routes.xlsx', uploadDate: '2024-01-13', status: 'failed', records: 0 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                <h1 className="text-lg font-semibold">File Upload</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <UploadIcon className="h-4 w-4" />
              <span>Upload Files</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="h-4 w-4" />
              <span>Upload History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Schedule Files</CardTitle>
                <CardDescription>
                  Upload Excel or CSV files containing delivery schedules, employee data, and store information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Supported File Types</p>
                    <p className="text-xs text-muted-foreground">
                      Excel (.xlsx, .xls), CSV (.csv) - Maximum 10MB per file
                    </p>
                  </div>
                  <Button
                    variant="outline"
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

                {uploads.length > 0 && (
                  <UploadProgress
                    uploads={uploads}
                    onRemove={handleRemoveUpload}
                  />
                )}
              </CardContent>
            </Card>

            {uploads.some(u => u.status === 'completed') && (
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Your files have been processed successfully. View the updated dashboard to see the new data.
                    </p>
                    <Link to="/">
                      <Button>View Dashboard</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload History</CardTitle>
                <CardDescription>
                  View your recent file uploads and their processing status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{item.fileName}</p>
                          <p className="text-xs text-muted-foreground">
                            Uploaded on {item.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm">{item.records} records</p>
                          <p className={`text-xs ${
                            item.status === 'completed' ? 'text-success' : 'text-destructive'
                          }`}>
                            {item.status}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}