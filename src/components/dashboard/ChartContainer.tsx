import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export function ChartContainer({ 
  title, 
  subtitle, 
  children, 
  className,
  actions 
}: ChartContainerProps) {
  return (
    <div className={cn(
      "bg-gradient-card rounded-lg border border-border p-6 shadow-lg hover:shadow-xl transition-shadow duration-300",
      className
    )}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </div>
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}