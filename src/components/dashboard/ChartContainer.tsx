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
      "bg-card rounded-lg border border-border p-6 shadow-sm",
      className
    )}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}