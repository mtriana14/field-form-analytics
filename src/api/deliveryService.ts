// api/deliveryService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Types matching your Lovable components
export interface StatsCardData {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: string;
  description: string;
}

export interface EmployeeActivity {
  id: number;
  name: string;
  store: string;
  hoursWorked: number;
  casesDelivered: number;
  efficiency: number;
  status: 'active' | 'idle' | 'inactive';
}

export interface StorePerformance {
  store: string;
  totalCases: number;
  deliveryCount: number;
  avgCasesPerDelivery: number;
}

export interface WeeklyTrend {
  week: string;
  cases: number;
  stores: number;
  date: string;
}

export interface OperationsSummary {
  totalDeliveries: number;
  totalCases: number;
  totalHours: number;
  recentDeliveries: number;
  averageCasesPerDelivery: number;
  averageHoursPerEmployee: number;
}

class DeliveryApiService {
  private async fetchWithErrorHandling<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}/api${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  // Dashboard Stats for StatsCard.tsx
  async getDashboardStats(): Promise<StatsCardData[]> {
    return this.fetchWithErrorHandling<StatsCardData[]>('/dashboard-stats');
  }

  // Employee Activity for EmployeeActivityTable.tsx
  async getEmployeeActivity(): Promise<EmployeeActivity[]> {
    return this.fetchWithErrorHandling<EmployeeActivity[]>('/employee-activity');
  }

  // Store Performance for charts
  async getStorePerformance(): Promise<StorePerformance[]> {
    return this.fetchWithErrorHandling<StorePerformance[]>('/store-performance');
  }

  // Weekly Trends for line charts
  async getWeeklyTrends(): Promise<WeeklyTrend[]> {
    return this.fetchWithErrorHandling<WeeklyTrend[]>('/weekly-trends');
  }

  // Operations Summary
  async getOperationsSummary(): Promise<OperationsSummary> {
    return this.fetchWithErrorHandling<OperationsSummary>('/operations-summary');
  }

  // Legacy endpoints (keeping for compatibility)
  async getStores() {
    return this.fetchWithErrorHandling('/stores');
  }

  async getEmployees() {
    return this.fetchWithErrorHandling('/employees');
  }

  async getWeeklySummary(company: string) {
    return this.fetchWithErrorHandling(`/weekly-summary/${company}`);
  }

  // File Upload endpoints
  async uploadScheduleFile(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      };
      
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      };
      
      xhr.onerror = () => reject(new Error('Upload failed'));
      
      xhr.open('POST', `${API_BASE_URL}/api/upload-schedule`);
      xhr.send(formData);
    });
  }

  async validateFile(file: File): Promise<FileValidationResult> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/api/validate-file`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Validation failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  async getUploadStatus(uploadId: string): Promise<UploadStatus> {
    return this.fetchWithErrorHandling<UploadStatus>(`/upload-status/${uploadId}`);
  }

  async getUploadHistory(): Promise<UploadHistoryItem[]> {
    return this.fetchWithErrorHandling<UploadHistoryItem[]>('/upload-history');
  }

  async downloadTemplate(templateType: string = 'schedule'): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/api/download-template/${templateType}`);
    
    if (!response.ok) {
      throw new Error(`Template download failed: ${response.statusText}`);
    }
    
    return response.blob();
  }
}

// File Upload Types
export interface UploadResponse {
  success: boolean;
  uploadId: string;
  message: string;
  processedRecords?: number;
  errors?: string[];
}

export interface FileValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  preview?: {
    headers: string[];
    rows: any[][];
    totalRows: number;
  };
}

export interface UploadStatus {
  id: string;
  fileName: string;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  uploadedAt: string;
  processedRecords?: number;
  errors?: string[];
}

export interface UploadHistoryItem {
  id: string;
  fileName: string;
  uploadDate: string;
  status: 'completed' | 'failed' | 'processing';
  processedRecords: number;
  fileSize: number;
  errors?: string[];
}

export const deliveryApi = new DeliveryApiService();

// React Hook for easy data fetching with loading and error states
import { useState, useEffect } from 'react';

export function useApiData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => setLoading(true) };
}

// Custom hooks for specific data
export const useDashboardStats = () => 
  useApiData(() => deliveryApi.getDashboardStats());

export const useEmployeeActivity = () => 
  useApiData(() => deliveryApi.getEmployeeActivity());

export const useStorePerformance = () => 
  useApiData(() => deliveryApi.getStorePerformance());

export const useWeeklyTrends = () => 
  useApiData(() => deliveryApi.getWeeklyTrends());

export const useOperationsSummary = () => 
  useApiData(() => deliveryApi.getOperationsSummary());

export const useUploadHistory = () => 
  useApiData(() => deliveryApi.getUploadHistory());
