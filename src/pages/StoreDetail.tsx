import { useParams, Link } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Clock, 
  Target,
  TrendingUp,
  TrendingDown,
  Package
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { chartOptions } from "@/lib/chartConfig";
import { mockStoreData } from "@/data/mockData";

// Mock detailed store data
const getStoreDetailData = (storeId: number) => {
  const store = mockStoreData.find(s => s.id === storeId);
  if (!store) return null;

  return {
    ...store,
    weeklyTrend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [{
        label: 'Cases Completed',
        data: [45, 52, 48, 58, 61, store.casesThisWeek],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      }],
    },
    employeePerformance: {
      labels: ['John D.', 'Sarah M.', 'Mike L.', 'Lisa K.'],
      datasets: [{
        label: 'Cases This Week',
        data: [18, 15, 20, 14],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0,
      }],
    },
    employees: [
      { name: 'John Davis', position: 'Senior Technician', hoursThisWeek: 38.5, casesCompleted: 18, efficiency: 96.2 },
      { name: 'Sarah Mitchell', position: 'Technician', hoursThisWeek: 35.0, casesCompleted: 15, efficiency: 91.7 },
      { name: 'Mike Lopez', position: 'Lead Technician', hoursThisWeek: 40.0, casesCompleted: 20, efficiency: 98.1 },
      { name: 'Lisa Kim', position: 'Technician', hoursThisWeek: 32.5, casesCompleted: 14, efficiency: 89.4 },
    ],
  };
};

export default function StoreDetail() {
  const { id } = useParams();
  const storeId = parseInt(id || '1');
  const storeData = getStoreDetailData(storeId);

  if (!storeData) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-card-foreground">Store not found</h2>
          <Link 
            to="/" 
            className="text-primary hover:text-primary-dark mt-4 inline-block"
          >
            Return to Dashboard
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const trendValue = ((storeData.casesThisWeek - storeData.casesLastWeek) / storeData.casesLastWeek * 100);
  const isPositiveTrend = trendValue > 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-dashboard-header">{storeData.name}</h1>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {storeData.location}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isPositiveTrend ? (
              <TrendingUp className="w-5 h-5 text-success" />
            ) : (
              <TrendingDown className="w-5 h-5 text-destructive" />
            )}
            <span className={`font-medium ${isPositiveTrend ? 'text-success' : 'text-destructive'}`}>
              {isPositiveTrend ? '+' : ''}{trendValue.toFixed(1)}% vs last week
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Cases This Week"
            value={storeData.casesThisWeek}
            icon={Package}
            change={`${isPositiveTrend ? '+' : ''}${trendValue.toFixed(1)}% vs last week`}
            changeType={isPositiveTrend ? 'positive' : 'negative'}
            description={`${storeData.casesLastWeek} last week`}
          />
          <StatsCard
            title="Active Employees"
            value={storeData.employeeCount}
            icon={Users}
            description="On current shift"
          />
          <StatsCard
            title="Avg Time per Case"
            value={`${storeData.avgTimePerCase} min`}
            icon={Clock}
            change="-5.2% improvement"
            changeType="positive"
            description="Per case processed"
          />
          <StatsCard
            title="Store Efficiency"
            value={`${storeData.efficiency}%`}
            icon={Target}
            change="+1.8% vs last month"
            changeType="positive"
            description="Overall performance"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Trend */}
          <ChartContainer
            title="6-Week Trend"
            subtitle="Cases completed over time"
            className="h-96"
          >
            <Line data={storeData.weeklyTrend} options={chartOptions} />
          </ChartContainer>

          {/* Employee Performance */}
          <ChartContainer
            title="Employee Performance"
            subtitle="Cases completed this week"
            className="h-96"
          >
            <Bar data={storeData.employeePerformance} options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                legend: { display: false }
              }
            }} />
          </ChartContainer>
        </div>

        {/* Employee Details */}
        <ChartContainer
          title="Employee Details"
          subtitle="Individual performance metrics"
        >
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Employee</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Position</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Hours</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cases</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cases/Hour</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {storeData.employees.map((employee, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <p className="font-medium text-card-foreground">{employee.name}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">{employee.position}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-muted-foreground mr-1" />
                        {employee.hoursThisWeek}h
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium">{employee.casesCompleted}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium">
                        {(employee.casesCompleted / employee.hoursThisWeek).toFixed(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          employee.efficiency >= 95 ? "bg-success" :
                          employee.efficiency >= 90 ? "bg-warning" : "bg-destructive"
                        }`} />
                        {employee.efficiency}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartContainer>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartContainer
            title="Performance Insights"
            subtitle="Key observations and recommendations"
          >
            <div className="space-y-4">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <h4 className="font-medium text-success mb-2">Positive Trends</h4>
                <ul className="text-sm space-y-1">
                  <li>• {trendValue.toFixed(1)}% increase in cases completed</li>
                  <li>• Efficiency improved by 1.8% this month</li>
                  <li>• Mike Lopez showing exceptional performance</li>
                </ul>
              </div>
              {trendValue < 0 && (
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-medium text-warning mb-2">Areas for Improvement</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Cases completed below last week's target</li>
                    <li>• Consider additional training for underperforming staff</li>
                    <li>• Review workflow optimization opportunities</li>
                  </ul>
                </div>
              )}
            </div>
          </ChartContainer>

          <ChartContainer
            title="Store Goals"
            subtitle="Targets and objectives"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Weekly Target</p>
                  <p className="text-sm text-muted-foreground">Cases to complete</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">75</p>
                  <p className="text-sm text-muted-foreground">
                    {storeData.casesThisWeek >= 75 ? 'Target met!' : `${75 - storeData.casesThisWeek} remaining`}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Efficiency Target</p>
                  <p className="text-sm text-muted-foreground">Minimum efficiency</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">95%</p>
                  <p className="text-sm text-muted-foreground">
                    Current: {storeData.efficiency}%
                  </p>
                </div>
              </div>
            </div>
          </ChartContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}