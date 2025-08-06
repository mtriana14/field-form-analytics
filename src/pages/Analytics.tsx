import { useState } from "react";
import { 
  CalendarDays, 
  TrendingUp, 
  Target, 
  Users, 
  Clock,
  BarChart3,
  LineChart,
  Download,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Line, Bar } from "react-chartjs-2";
import { chartOptions } from "@/lib/chartConfig";

export default function Analytics() {
  const [timePeriod, setTimePeriod] = useState("8weeks");

  // Mock data for analytics
  const weeklyPerformanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'Cases Completed',
        data: [156, 189, 142, 198, 176, 203, 234, 187],
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Target',
        data: [200, 200, 200, 200, 200, 200, 200, 200],
        borderColor: 'hsl(var(--warning))',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0,
        fill: false,
      }
    ]
  };

  const storeComparisonData = {
    labels: ['Store A', 'Store B', 'Store C', 'Store D', 'Store E', 'Store F'],
    datasets: [
      {
        label: 'This Week',
        data: [45, 38, 52, 41, 49, 35],
        backgroundColor: 'hsl(var(--primary))',
      },
      {
        label: 'Last Week',
        data: [42, 35, 48, 38, 44, 32],
        backgroundColor: 'hsl(var(--primary) / 0.5)',
      }
    ]
  };

  const efficiencyTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'Overall Efficiency',
        data: [78, 82, 71, 89, 84, 91, 94, 87],
        borderColor: 'hsl(var(--success))',
        backgroundColor: 'hsl(var(--success) / 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const insights = [
    {
      title: "Peak Performance Week",
      description: "Week 7 showed highest efficiency at 94%",
      trend: "positive",
      value: "94%"
    },
    {
      title: "Store Improvement",
      description: "Store C consistently outperforms targets",
      trend: "positive",
      value: "+8.3%"
    },
    {
      title: "Attention Needed",
      description: "Store F below average for 3 weeks",
      trend: "negative",
      value: "-12%"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dashboard-header">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive performance analysis and trends</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4weeks">Last 4 Weeks</SelectItem>
                <SelectItem value="8weeks">Last 8 Weeks</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Avg Weekly Cases"
            value="187"
            change="+12%"
            changeType="positive"
            icon={Target}
            description="Target: 200 cases/week"
          />
          <StatsCard
            title="Efficiency Trend"
            value="85.2%"
            change="+3.2%"
            changeType="positive"
            icon={TrendingUp}
            description="8-week average"
          />
          <StatsCard
            title="Top Performer"
            value="Store C"
            change="52 cases"
            changeType="positive"
            icon={Users}
            description="This week's leader"
          />
          <StatsCard
            title="Avg Response Time"
            value="2.4h"
            change="-0.3h"
            changeType="positive"
            icon={Clock}
            description="Faster than last period"
          />
        </div>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((insight, index) => (
                <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground">{insight.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={
                        insight.trend === 'positive' 
                          ? 'text-success border-success/20 bg-success/10' 
                          : 'text-destructive border-destructive/20 bg-destructive/10'
                      }
                    >
                      {insight.value}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                Week-to-Week Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer title="Week-to-Week Performance">
                <Line 
                  data={weeklyPerformanceData} 
                  options={{
                    ...chartOptions,
                    scales: {
                      ...chartOptions.scales,
                      y: {
                        ...chartOptions.scales?.y,
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Cases Completed'
                        }
                      }
                    }
                  }} 
                />
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Store Performance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer title="Store Performance Comparison">
                <Bar 
                  data={storeComparisonData} 
                  options={{
                    ...chartOptions,
                    scales: {
                      ...chartOptions.scales,
                      y: {
                        ...chartOptions.scales?.y,
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Cases This Week'
                        }
                      }
                    }
                  }} 
                />
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Efficiency Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Efficiency Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer title="Efficiency Trend Analysis">
              <Line 
                data={efficiencyTrendData} 
                options={{
                  ...chartOptions,
                  scales: {
                    ...chartOptions.scales,
                    y: {
                      ...chartOptions.scales?.y,
                      beginAtZero: true,
                      max: 100,
                      title: {
                        display: true,
                        text: 'Efficiency (%)'
                      }
                    }
                  }
                }} 
              />
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Performance Heatmap Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 56 }, (_, i) => {
                const intensity = Math.random();
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${
                      intensity > 0.8 ? 'bg-success' :
                      intensity > 0.6 ? 'bg-success/70' :
                      intensity > 0.4 ? 'bg-warning/70' :
                      intensity > 0.2 ? 'bg-warning/50' :
                      'bg-muted/30'
                    }`}
                    title={`Day ${i + 1}: ${Math.round(intensity * 100)}% efficiency`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>Less efficient</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-muted/30 rounded-sm" />
                <div className="w-3 h-3 bg-warning/50 rounded-sm" />
                <div className="w-3 h-3 bg-warning/70 rounded-sm" />
                <div className="w-3 h-3 bg-success/70 rounded-sm" />
                <div className="w-3 h-3 bg-success rounded-sm" />
              </div>
              <span>More efficient</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}