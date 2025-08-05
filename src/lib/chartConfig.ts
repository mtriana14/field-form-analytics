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

// SimilarWeb-inspired dark analytics palette
export const chartColors = {
  primary: '#4F7CFF',
  primaryLight: '#6B8EFF',
  secondary: '#10B981',
  accent: '#F59E0B',
  warning: '#EF4444',
  info: '#8B5CF6',
  neutral: '#64748B',
  success: '#059669',
  background: '#0F172A',
  foreground: '#E2E8F0',
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
        padding: 24,
        color: chartColors.foreground,
        font: {
          size: 13,
          weight: 'normal' as const,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      titleColor: chartColors.foreground,
      bodyColor: '#94A3B8',
      borderColor: '#334155',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      padding: 12,
      titleFont: {
        size: 14,
        weight: 'bold' as const,
      },
      bodyFont: {
        size: 13,
      },
      callbacks: {
        labelColor: function(context: any) {
          return {
            borderColor: context.dataset.borderColor,
            backgroundColor: context.dataset.backgroundColor,
          };
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        color: '#334155',
      },
      ticks: {
        color: '#94A3B8',
        font: {
          size: 12,
          weight: 'normal' as const,
        },
      },
      border: {
        color: '#334155',
      },
    },
    y: {
      grid: {
        color: '#1E293B',
        lineWidth: 1,
      },
      ticks: {
        color: '#94A3B8',
        font: {
          size: 12,
          weight: 'normal' as const,
        },
      },
      border: {
        color: '#334155',
      },
    },
  },
};