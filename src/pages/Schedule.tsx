import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function Schedule() {
  // Mock schedule data
  const todaySchedule = [
    {
      time: "09:00 AM",
      employee: "John Smith",
      store: "Downtown Store",
      task: "Morning inventory check",
      priority: "high"
    },
    {
      time: "10:30 AM",
      employee: "Sarah Johnson",
      store: "Mall Location",
      task: "Customer service training",
      priority: "medium"
    },
    {
      time: "02:00 PM",
      employee: "Mike Wilson",
      store: "North Branch",
      task: "Equipment maintenance",
      priority: "high"
    },
    {
      time: "03:30 PM",
      employee: "Lisa Chen",
      store: "Downtown Store",
      task: "Performance review meeting",
      priority: "low"
    }
  ];

  const weeklyStats = {
    totalShifts: 156,
    averageHours: 38.5,
    coverage: 98.2,
    overtime: 12.3
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Schedule Management</h2>
          <p className="text-muted-foreground">Manage employee schedules and shifts</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Shifts"
            value={weeklyStats.totalShifts}
            icon={Calendar}
            description="This week"
            className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-200/20"
          />
          <StatsCard
            title="Avg Hours/Employee"
            value={weeklyStats.averageHours}
            icon={Clock}
            description="Per week"
            className="bg-gradient-to-br from-green-500/5 to-green-600/5 border-green-200/20"
          />
          <StatsCard
            title="Schedule Coverage"
            value={`${weeklyStats.coverage}%`}
            icon={Users}
            description="All positions filled"
            className="bg-gradient-to-br from-purple-500/5 to-purple-600/5 border-purple-200/20"
          />
          <StatsCard
            title="Overtime Hours"
            value={`${weeklyStats.overtime}%`}
            icon={MapPin}
            description="Of total hours"
            className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border-orange-200/20"
          />
        </div>

        {/* Today's Schedule */}
        <ChartContainer
          title="Today's Schedule"
          subtitle={`${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
        >
          <div className="space-y-4">
            {todaySchedule.map((item, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-primary">{item.time}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{item.employee}</h4>
                      <p className="text-sm text-muted-foreground">{item.store}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{item.task}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={item.priority === 'high' ? 'destructive' : 
                            item.priority === 'medium' ? 'default' : 'secondary'}
                  >
                    {item.priority} priority
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </ChartContainer>

        {/* Weekly Schedule Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer
            title="This Week's Coverage"
            subtitle="Schedule coverage by day"
          >
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                const coverage = Math.floor(Math.random() * 20) + 80; // Mock data
                return (
                  <div key={day} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="font-medium text-foreground">{day}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{coverage}%</span>
                      <div className="w-24 bg-muted/40 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${coverage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartContainer>

          <ChartContainer
            title="Upcoming Events"
            subtitle="Important schedule items"
          >
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-200/20">
                <h4 className="font-medium text-blue-700 dark:text-blue-300">Team Meeting</h4>
                <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM - All Stores</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-200/20">
                <h4 className="font-medium text-green-700 dark:text-green-300">Training Session</h4>
                <p className="text-sm text-muted-foreground">Friday, 2:00 PM - New Employees</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-200/20">
                <h4 className="font-medium text-purple-700 dark:text-purple-300">Monthly Review</h4>
                <p className="text-sm text-muted-foreground">Next Monday, 9:00 AM - Management</p>
              </div>
            </div>
          </ChartContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}