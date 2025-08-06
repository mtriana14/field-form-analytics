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

  const getIconBackground = () => {
    // Use different gradient backgrounds based on the icon type
    if (title.toLowerCase().includes('store')) return 'bg-gradient-to-br from-blue-500/10 to-blue-600/20';
    if (title.toLowerCase().includes('employee')) return 'bg-gradient-to-br from-purple-500/10 to-purple-600/20';
    if (title.toLowerCase().includes('case')) return 'bg-gradient-to-br from-orange-500/10 to-orange-600/20';
    if (title.toLowerCase().includes('efficiency')) return 'bg-gradient-to-br from-green-500/10 to-green-600/20';
    return 'bg-gradient-to-br from-primary/10 to-primary/20';
  };

  const getIconColor = () => {
    if (title.toLowerCase().includes('store')) return 'text-blue-600';
    if (title.toLowerCase().includes('employee')) return 'text-purple-600';
    if (title.toLowerCase().includes('case')) return 'text-orange-600';
    if (title.toLowerCase().includes('efficiency')) return 'text-green-600';
    return 'text-primary';
  };

  return (
    <Card className={cn(
      "group relative overflow-hidden bg-gradient-to-br from-card via-card to-card/95 border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 p-6",
      className
    )}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2 mb-1 group-hover:scale-105 transition-transform duration-200">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-xs font-semibold px-3 py-1.5 rounded-full border",
                getChangeColor()
              )}>
                {change}
              </span>
            </div>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-2 font-medium">{description}</p>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center shadow-lg border border-white/10 group-hover:scale-110 transition-all duration-300",
            getIconBackground()
          )}>
            <Icon className={cn("w-7 h-7", getIconColor())} />
          </div>
        </div>
      </div>
    </Card>
  );
}