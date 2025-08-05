import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change,
  changeType = 'neutral',
  icon: Icon, 
  description, 
  className 
}: StatsCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success bg-success/10';
      case 'negative':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted/20';
    }
  };

  return (
    <Card className={cn(
      "bg-gradient-to-br from-card to-card/80 border-border/50 hover:shadow-lg transition-all duration-300 p-6",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2 mb-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-xs font-semibold px-2 py-1 rounded-full",
                getChangeColor()
              )}>
                {change}
              </span>
            </div>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </Card>
  );
}