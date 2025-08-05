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
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-sidebar to-sidebar/95 text-sidebar-foreground shadow-xl">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b border-sidebar-border/20">
              <h1 className="text-xl font-bold text-sidebar-foreground">DeliveryPro</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-3 py-6">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-sidebar-border/20">
              <p className="text-xs text-sidebar-foreground/60">
                © 2025 DeliveryPro Analytics
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sticky Header with Blur Backdrop */}
          <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Delivery Analytics Dashboard
              </h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Live Data</span>
                </div>
                <span className="text-sm text-muted-foreground">Welcome back, Admin</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}