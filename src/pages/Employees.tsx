import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, Target, Award } from "lucide-react";
import { mockEmployeeActivity } from "@/data/mockData";

export default function Employees() {
  const totalEmployees = mockEmployeeActivity.length;
  const avgEfficiency = Math.round(mockEmployeeActivity.reduce((acc, emp) => acc + emp.efficiency, 0) / totalEmployees);
  const totalHours = mockEmployeeActivity.reduce((acc, emp) => acc + emp.hoursWorked, 0);
  const totalCases = mockEmployeeActivity.reduce((acc, emp) => acc + emp.casesCompleted, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Employee Management</h2>
          <p className="text-muted-foreground">Track employee performance and productivity</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Employees"
            value={totalEmployees}
            icon={Users}
            description="Active workforce"
            className="bg-gradient-to-br from-purple-500/5 to-purple-600/5 border-purple-200/20"
          />
          <StatsCard
            title="Avg Efficiency"
            value={`${avgEfficiency}%`}
            icon={Target}
            description="Team performance"
            className="bg-gradient-to-br from-green-500/5 to-green-600/5 border-green-200/20"
          />
          <StatsCard
            title="Total Hours"
            value={totalHours}
            icon={Clock}
            description="This week"
            className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-200/20"
          />
          <StatsCard
            title="Cases Completed"
            value={totalCases}
            icon={Award}
            description="This week"
            className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 border-orange-200/20"
          />
        </div>

        {/* Employee Performance Cards */}
        <ChartContainer
          title="Employee Performance"
          subtitle="Individual productivity metrics"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEmployeeActivity.map((employee, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="space-y-4">
                  {/* Employee Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{employee.name}</h4>
                      <p className="text-sm text-muted-foreground">{employee.store}</p>
                    </div>
                    <Badge 
                      variant={employee.efficiency >= 95 ? "default" : 
                              employee.efficiency >= 85 ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {employee.efficiency >= 95 ? "Top Performer" :
                       employee.efficiency >= 85 ? "Good" : "Needs Focus"}
                    </Badge>
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Hours Worked</span>
                      <span className="font-medium">{employee.hoursWorked}h</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Cases Completed</span>
                      <span className="font-medium">{employee.casesCompleted}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Efficiency</span>
                        <span className="font-medium">{employee.efficiency}%</span>
                      </div>
                      <Progress 
                        value={employee.efficiency} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ChartContainer>
      </div>
    </DashboardLayout>
  );
}