import { Link } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import { 
  Building2, 
  Users, 
  Package, 
  TrendingUp,
  Target,
  ExternalLink,
  Upload
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { StoreCard } from "@/components/dashboard/StoreCard";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { Button } from "@/components/ui/button";
import { chartOptions } from "@/lib/chartConfig";
import { 
  mockCompanyData, 
  mockStoreData, 
  mockWeeklyData, 
  mockStoreComparison,
  mockEmployeeActivity 
} from "@/data/mockData";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Upload Button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
            <p className="text-muted-foreground">Monitor your delivery operations performance</p>
          </div>
          <Link to="/upload">
            <Button className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Files</span>
            </Button>
          </Link>
        </div>
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Stores"
            value={mockCompanyData.totalStores}
            icon={Building2}
            description="Active retail locations"
          />
          <StatsCard
            title="Total Employees"
            value={mockCompanyData.totalEmployees}
            icon={Users}
            description="Active field workers"
          />
          <StatsCard
            title="Cases This Week"
            value={mockCompanyData.avgCasesPerWeek}
            icon={Package}
            change={`+${mockCompanyData.weekOverWeekGrowth}% vs last week`}
            changeType="positive"
            description="Cases completed"
          />
          <StatsCard
            title="Overall Efficiency"
            value={`${mockCompanyData.employeeEfficiency}%`}
            icon={Target}
            change="+2.3% vs last month"
            changeType="positive"
            description="Across all stores"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Performance Chart */}
          <ChartContainer
            title="Week-over-Week Performance"
            subtitle="Cases completed vs target"
            className="h-96"
          >
            <Line data={mockWeeklyData} options={chartOptions} />
          </ChartContainer>

          {/* Store Comparison Chart */}
          <ChartContainer
            title="Store Comparison"
            subtitle="Cases completed this week"
            className="h-96"
          >
            <Bar data={mockStoreComparison} options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                legend: { display: false }
              }
            }} />
          </ChartContainer>
        </div>

        {/* Store Performance Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Store Performance</h3>
              <p className="text-muted-foreground">Individual store metrics and trends</p>
            </div>
            <Link
              to="/analytics"
              className="flex items-center text-sm text-primary hover:text-primary-dark transition-colors"
            >
              View Analytics
              <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStoreData.map((store) => {
              const trendPercentage = Number(((store.casesThisWeek - store.casesLastWeek) / store.casesLastWeek * 100).toFixed(1));
              const status = store.efficiency >= 95 ? 'excellent' : 
                           store.efficiency >= 85 ? 'good' : 
                           store.efficiency >= 75 ? 'needs-attention' : 'critical';
              
              return (
                <StoreCard
                  key={store.id}
                  id={store.id.toString()}
                  name={store.name}
                  cases={store.casesThisWeek}
                  trend={trendPercentage}
                  employees={store.employeeCount}
                  avgTime={`${store.avgTimePerCase}m`}
                  efficiency={store.efficiency}
                  status={status as 'excellent' | 'good' | 'needs-attention' | 'critical'}
                />
              );
            })}
          </div>
        </div>

        {/* Employee Activity Summary */}
        <ChartContainer
          title="Top Employee Activity"
          subtitle="This week's performance leaders"
          actions={
            <Link
              to="/employees"
              className="flex items-center text-sm text-primary hover:text-primary-dark transition-colors"
            >
              View All Employees
              <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockEmployeeActivity.slice(0, 6).map((employee, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <h4 className="font-medium text-card-foreground">{employee.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{employee.store}</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Hours:</span>
                    <span className="font-medium">{employee.hoursWorked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cases:</span>
                    <span className="font-medium">{employee.casesCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency:</span>
                    <span className={`font-medium ${
                      employee.efficiency >= 95 ? "text-success" :
                      employee.efficiency >= 90 ? "text-warning" : "text-destructive"
                    }`}>
                      {employee.efficiency}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </DashboardLayout>
  );
}