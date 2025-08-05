import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

// Professional color palette inspired by SimilarWeb
export const chartColors = {
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  secondary: '#10B981',
  accent: '#F59E0B',
  warning: '#EF4444',
  info: '#8B5CF6',
  neutral: '#6B7280',
  success: '#059669',
};

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          weight: 'normal' as const,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#374151',
      bodyColor: '#6B7280',
      borderColor: '#E5E7EB',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      titleFont: {
        size: 14,
        weight: 'bold' as const,
      },
      bodyFont: {
        size: 13,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#6B7280',
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        color: '#F3F4F6',
      },
      ticks: {
        color: '#6B7280',
        font: {
          size: 12,
        },
      },
    },
  },
};