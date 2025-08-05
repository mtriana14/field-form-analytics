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
