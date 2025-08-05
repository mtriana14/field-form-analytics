import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Building2, 
  Users, 
  TrendingUp, 
  Calendar,
  Settings,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Stores", href: "/stores", icon: Building2 },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Trends", href: "/trends", icon: TrendingUp },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-sidebar text-sidebar-foreground">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
              <h1 className="text-xl font-bold">DeliveryPro</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-sidebar-border">
              <p className="text-xs text-sidebar-foreground/60">
                © 2025 DeliveryPro Analytics
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-dashboard-panel border-b border-border px-6 py-4">
            <h2 className="text-2xl font-semibold text-dashboard-header">
              Delivery Analytics Dashboard
            </h2>
          </header>

          {/* Page Content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}