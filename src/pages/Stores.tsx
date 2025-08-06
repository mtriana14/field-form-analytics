import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StoreCard } from "@/components/dashboard/StoreCard";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Building2, MapPin, TrendingUp, Users } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { mockStoreData } from "@/data/mockData";
import { chartOptions } from "@/lib/chartConfig";

export default function Stores() {
  const totalStores = mockStoreData.length;
  const averageEfficiency = Math.round(mockStoreData.reduce((acc, store) => acc + store.efficiency, 0) / totalStores);
  const totalEmployees = mockStoreData.reduce((acc, store) => acc + store.employeeCount, 0);
  
  const storeComparisonData = {
    labels: mockStoreData.map(store => store.name),
    datasets: [
      {
        label: 'Efficiency %',
        data: mockStoreData.map(store => store.efficiency),
        backgroundColor: 'hsl(var(--primary) / 0.8)',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 2,
        borderRadius: 6,
      }
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Store Management</h2>
          <p className="text-muted-foreground">Monitor and manage all store locations</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Stores"
            value={totalStores}
            icon={Building2}
            description="Active locations"
            className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-200/20"
          />
          <StatsCard
            title="Average Efficiency"
            value={`${averageEfficiency}%`}
            icon={TrendingUp}
            description="Across all stores"
            className="bg-gradient-to-br from-green-500/5 to-green-600/5 border-green-200/20"
          />
          <StatsCard
            title="Total Employees"
            value={totalEmployees}
            icon={Users}
            description="All store staff"
            className="bg-gradient-to-br from-purple-500/5 to-purple-600/5 border-purple-200/20"
          />
          <StatsCard
            title="Regions Covered"
            value="4"
            icon={MapPin}
            description="Geographic areas"
            className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border-orange-200/20"
          />
        </div>

        {/* Store Efficiency Chart */}
        <ChartContainer
          title="Store Efficiency Comparison"
          subtitle="Performance across all locations"
          className="h-96"
        >
          <Bar data={storeComparisonData} options={chartOptions} />
        </ChartContainer>

        {/* Store Cards Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">All Stores</h3>
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
      </div>
    </DashboardLayout>
  );
}