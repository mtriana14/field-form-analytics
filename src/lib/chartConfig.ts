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
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  hover: {
    mode: 'index' as const,
    intersect: false,
    animationDuration: 200,
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart' as const,
  },
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        color: chartColors.foreground,
        font: {
          size: 12,
          weight: 500,
          family: 'Inter, sans-serif',
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.98)',
      titleColor: chartColors.foreground,
      bodyColor: '#CBD5E1',
      borderColor: chartColors.primary,
      borderWidth: 1,
      cornerRadius: 12,
      displayColors: true,
      padding: 16,
      titleFont: {
        size: 14,
        weight: 600,
        family: 'Inter, sans-serif',
      },
      bodyFont: {
        size: 13,
        family: 'Inter, sans-serif',
      },
      filter: function(tooltipItem: any) {
        return tooltipItem.datasetIndex !== undefined;
      },
      callbacks: {
        title: function(context: any) {
          return context[0].label || '';
        },
        label: function(context: any) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          label += new Intl.NumberFormat().format(context.parsed.y);
          return label;
        },
        labelColor: function(context: any) {
          return {
            borderColor: context.dataset.borderColor,
            backgroundColor: context.dataset.backgroundColor,
            borderWidth: 2,
          };
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        color: 'rgba(51, 65, 85, 0.3)',
      },
      ticks: {
        color: '#94A3B8',
        font: {
          size: 11,
          weight: 400,
          family: 'Inter, sans-serif',
        },
        maxTicksLimit: 8,
      },
      border: {
        color: '#334155',
        width: 1,
      },
    },
    y: {
      grid: {
        color: 'rgba(30, 41, 59, 0.6)',
        lineWidth: 1,
      },
      ticks: {
        color: '#94A3B8',
        font: {
          size: 11,
          weight: 400,
          family: 'Inter, sans-serif',
        },
        callback: function(value: any) {
          return new Intl.NumberFormat().format(value);
        },
      },
      border: {
        color: '#334155',
        width: 1,
      },
    },
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 8,
      borderWidth: 2,
      hoverBorderWidth: 3,
    },
    line: {
      borderWidth: 3,
      tension: 0.4,
    },
    bar: {
      borderRadius: 4,
      borderWidth: 0,
    },
  },
};