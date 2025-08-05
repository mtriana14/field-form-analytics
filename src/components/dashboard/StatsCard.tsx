import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  className 
}: StatsCardProps) {
  return (
    <div className={cn(
      "bg-gradient-card rounded-lg border border-border p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-3">
              <span className={cn(
                "text-sm font-semibold px-2 py-1 rounded-full",
                trend.isPositive 
                  ? "text-success bg-success/10" 
                  : "text-destructive bg-destructive/10"
              )}>
                {trend.isPositive ? "↗" : "↘"} {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                {trend.label}
              </span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md">
            <Icon className="w-7 h-7 text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}