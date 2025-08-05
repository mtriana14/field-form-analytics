// Mock data for the analytics dashboard
export const mockCompanyData = {
  totalStores: 12,
  totalEmployees: 45,
  totalCases: 2847,
  avgCasesPerWeek: 534,
  weekOverWeekGrowth: 8.5,
  employeeEfficiency: 92.3,
};

export const mockStoreData = [
  {
    id: 1,
    name: "Downtown Store",
    location: "123 Main St",
    casesThisWeek: 67,
    casesLastWeek: 58,
    employeeCount: 4,
    avgTimePerCase: 12.5,
    trend: "up",
    efficiency: 94.2,
  },
  {
    id: 2,
    name: "Mall Location",
    location: "456 Shopping Center",
    casesThisWeek: 45,
    casesLastWeek: 52,
    employeeCount: 3,
    avgTimePerCase: 15.2,
    trend: "down",
    efficiency: 87.1,
  },
  {
    id: 3,
    name: "North Branch",
    location: "789 North Ave",
    casesThisWeek: 72,
    casesLastWeek: 69,
    employeeCount: 5,
    avgTimePerCase: 11.8,
    trend: "up",
    efficiency: 96.5,
  },
  {
    id: 4,
    name: "East Side Store",
    location: "321 East Blvd",
    casesThisWeek: 38,
    casesLastWeek: 41,
    employeeCount: 2,
    avgTimePerCase: 14.7,
    trend: "down",
    efficiency: 89.3,
  },
];

export const mockWeeklyData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  datasets: [
    {
      label: 'Cases Completed',
      data: [485, 502, 478, 521, 534, 578],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Target',
      data: [500, 500, 500, 500, 500, 500],
      borderColor: '#10B981',
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderDash: [5, 5],
      fill: false,
    },
  ],
};

export const mockStoreComparison = {
  labels: mockStoreData.map(store => store.name),
  datasets: [
    {
      label: 'Cases This Week',
      data: mockStoreData.map(store => store.casesThisWeek),
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 0,
    },
  ],
};

export const mockEmployeeActivity = [
  { name: 'John Smith', store: 'Downtown Store', hoursWorked: 38.5, casesCompleted: 23, efficiency: 95.2 },
  { name: 'Sarah Johnson', store: 'Mall Location', hoursWorked: 35.0, casesCompleted: 19, efficiency: 88.7 },
  { name: 'Mike Davis', store: 'North Branch', hoursWorked: 40.0, casesCompleted: 28, efficiency: 97.1 },
  { name: 'Lisa Wilson', store: 'East Side Store', hoursWorked: 32.5, casesCompleted: 16, efficiency: 91.3 },
  { name: 'Tom Brown', store: 'Downtown Store', hoursWorked: 37.5, casesCompleted: 22, efficiency: 93.8 },
];

export const mockTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Efficiency Trend',
      data: [85.2, 87.1, 89.3, 91.2, 92.8, 94.1],
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
    },
  ],
};