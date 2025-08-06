import { TrendingUp, TrendingDown, Users, Clock, Target, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface StoreCardProps {
  id: string;
  name: string;
  cases: number;
  trend: number;
  employees: number;
  avgTime: string;
  efficiency: number;
  status: 'excellent' | 'good' | 'needs-attention' | 'critical';
}

export function StoreCard({ 
  id, 
  name, 
  cases, 
  trend, 
  employees, 
  avgTime, 
  efficiency, 
  status 
}: StoreCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'excellent':
        return 'bg-success/10 text-success border-success/20';
      case 'good':
        return 'bg-info/10 text-info border-info/20';
      case 'needs-attention':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getTrendIcon = () => {
    return trend >= 0 ? (
      <TrendingUp className="w-4 h-4 text-success" />
    ) : (
      <TrendingDown className="w-4 h-4 text-destructive" />
    );
  };

  const getTrendColor = () => {
    return trend >= 0 ? 'text-success' : 'text-destructive';
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-card to-card/80 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <Badge variant="outline" className={cn("text-xs font-medium", getStatusColor())}>
              {status.replace('-', ' ')}
            </Badge>
          </div>
          <Link 
            to={`/store/${id}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-primary/10 rounded-lg"
          >
            <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
          </Link>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Cases</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">{cases}</span>
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span className={cn("text-sm font-medium", getTrendColor())}>
                  {Math.abs(trend)}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Team</span>
            </div>
            <span className="text-2xl font-bold text-foreground">{employees}</span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Avg Time</span>
            </div>
            <span className="text-sm font-medium text-foreground">{avgTime}</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Efficiency</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">{efficiency}%</span>
              <div className="flex-1 bg-muted/20 rounded-full h-2 overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    efficiency >= 90 ? "bg-success" :
                    efficiency >= 75 ? "bg-info" :
                    efficiency >= 60 ? "bg-warning" : "bg-destructive"
                  )}
                  style={{ width: `${Math.min(efficiency, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}