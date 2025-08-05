import { Link } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import { 
  Building2, 
  Users, 
  Package, 
  TrendingUp,
  Clock,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
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
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Stores"
            value={mockCompanyData.totalStores}
            icon={Building2}
            subtitle="Active locations"
          />
          <StatsCard
            title="Total Employees"
            value={mockCompanyData.totalEmployees}
            icon={Users}
            subtitle="Active workers"
          />
          <StatsCard
            title="Cases This Week"
            value={mockCompanyData.avgCasesPerWeek}
            icon={Package}
            trend={{
              value: mockCompanyData.weekOverWeekGrowth,
              label: "vs last week",
              isPositive: true
            }}
          />
          <StatsCard
            title="Avg Efficiency"
            value={`${mockCompanyData.employeeEfficiency}%`}
            icon={Target}
            trend={{
              value: 2.3,
              label: "vs last month",
              isPositive: true
            }}
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

        {/* Store Performance Table */}
        <ChartContainer
          title="Store Performance Overview"
          subtitle="Detailed metrics for each location"
          actions={
            <Link
              to="/stores"
              className="flex items-center text-sm text-primary hover:text-primary-dark transition-colors"
            >
              View All Stores
              <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Store</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cases</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Trend</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Employees</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Avg Time</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Efficiency</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockStoreData.map((store) => (
                  <tr key={store.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-card-foreground">{store.name}</p>
                        <p className="text-sm text-muted-foreground">{store.location}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="font-medium">{store.casesThisWeek}</span>
                        <span className="text-sm text-muted-foreground ml-1">
                          ({store.casesLastWeek} last week)
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {store.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4 text-success mr-1" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-destructive mr-1" />
                        )}
                        <span className={`text-sm font-medium ${
                          store.trend === "up" ? "text-success" : "text-destructive"
                        }`}>
                          {store.trend === "up" ? "+" : "-"}
                          {Math.abs(((store.casesThisWeek - store.casesLastWeek) / store.casesLastWeek * 100)).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-muted-foreground mr-1" />
                        {store.employeeCount}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-muted-foreground mr-1" />
                        {store.avgTimePerCase} min
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          store.efficiency >= 95 ? "bg-success" :
                          store.efficiency >= 90 ? "bg-warning" : "bg-destructive"
                        }`} />
                        {store.efficiency}%
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        to={`/store/${store.id}`}
                        className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartContainer>

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