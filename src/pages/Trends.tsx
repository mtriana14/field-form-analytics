import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Line, Bar } from "react-chartjs-2";
import { TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react";
import { chartOptions } from "@/lib/chartConfig";

export default function Trends() {
  // Mock trend data
  const weeklyTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Cases Completed',
        data: [450, 520, 480, 600, 650, 720],
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        tension: 0.4,
      },
      {
        label: 'Efficiency %',
        data: [85, 87, 84, 89, 91, 93],
        borderColor: 'hsl(var(--success))',
        backgroundColor: 'hsl(var(--success) / 0.1)',
        tension: 0.4,
      }
    ]
  };

  const monthlyComparisonData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'This Year',
        data: [2400, 2600, 2800, 3200, 3500, 3800],
        backgroundColor: 'hsl(var(--primary) / 0.8)',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 2,
      },
      {
        label: 'Last Year',
        data: [2200, 2400, 2500, 2800, 3000, 3200],
        backgroundColor: 'hsl(var(--muted) / 0.8)',
        borderColor: 'hsl(var(--muted-foreground))',
        borderWidth: 2,
      }
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Trends & Analytics</h2>
          <p className="text-muted-foreground">Long-term performance trends and insights</p>
        </div>

        {/* Key Trend Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Weekly Growth"
            value="+12.5%"
            icon={TrendingUp}
            change="+2.1% vs last month"
            changeType="positive"
            description="Cases completed"
            className="bg-gradient-to-br from-green-500/5 to-green-600/5 border-green-200/20"
          />
          <StatsCard
            title="Efficiency Trend"
            value="+8.2%"
            icon={Activity}
            change="+1.5% this quarter"
            changeType="positive"
            description="Performance improvement"
            className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-200/20"
          />
          <StatsCard
            title="Monthly Variance"
            value="-2.1%"
            icon={TrendingDown}
            change="Within normal range"
            changeType="neutral"
            description="Standard deviation"
            className="bg-gradient-to-br from-yellow-500/5 to-yellow-600/5 border-yellow-200/20"
          />
          <StatsCard
            title="Forecast Score"
            value="94.2%"
            icon={BarChart3}
            change="High accuracy"
            changeType="positive"
            description="Prediction model"
            className="bg-gradient-to-br from-purple-500/5 to-purple-600/5 border-purple-200/20"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Trends */}
          <ChartContainer
            title="6-Week Performance Trend"
            subtitle="Cases completed and efficiency over time"
            className="h-96"
          >
            <Line data={weeklyTrendData} options={chartOptions} />
          </ChartContainer>

          {/* Monthly Comparison */}
          <ChartContainer
            title="Year-over-Year Comparison"
            subtitle="Monthly cases completed comparison"
            className="h-96"
          >
            <Bar data={monthlyComparisonData} options={chartOptions} />
          </ChartContainer>
        </div>

        {/* Trend Insights */}
        <ChartContainer
          title="Key Insights"
          subtitle="Data-driven observations and recommendations"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-success/5 to-success/10 rounded-lg border border-success/20">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-success" />
                <h4 className="font-semibold text-success">Positive Trend</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Overall performance has improved by 15% over the last quarter, with consistent week-over-week growth.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-info/5 to-info/10 rounded-lg border border-info/20">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-5 h-5 text-info" />
                <h4 className="font-semibold text-info">Efficiency Gains</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Employee efficiency has increased steadily, suggesting effective training and process improvements.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-warning/5 to-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-5 h-5 text-warning" />
                <h4 className="font-semibold text-warning">Seasonal Pattern</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Data shows a seasonal pattern with higher activity in Q2 and Q4. Plan resources accordingly.
              </p>
            </div>
          </div>
        </ChartContainer>
      </div>
    </DashboardLayout>
  );
}