import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Activity, Users, Thermometer, Droplets, Wind, Sun } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, changeType, color }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="p-6 bg-gradient-card border-0 shadow-card-soft backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className={`p-3 rounded-xl ${color} text-white shadow-md`}
          >
            {icon}
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
        <div className={`text-sm font-medium ${
          changeType === 'increase' ? 'text-risk-high' : 
          changeType === 'decrease' ? 'text-risk-safe' : 
          'text-muted-foreground'
        }`}>
          {change}
        </div>
      </div>
    </Card>
  </motion.div>
);

export const DashboardStats = () => {
  const stats = [
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: "Active Alerts",
      value: "12",
      change: "+3 today",
      changeType: 'increase' as const,
      color: "bg-risk-high"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Safe Zones",
      value: "847",
      change: "+2.1%",
      changeType: 'increase' as const,
      color: "bg-risk-safe"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "At Risk Population",
      value: "2.3M",
      change: "-0.5%",
      changeType: 'decrease' as const,
      color: "bg-risk-medium"
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: "Response Teams",
      value: "156",
      change: "24 active",
      changeType: 'neutral' as const,
      color: "bg-primary"
    }
  ];

  const weatherStats = [
    {
      icon: <Thermometer className="w-4 h-4" />,
      label: "Temperature",
      value: "32°C",
      status: "high"
    },
    {
      icon: <Droplets className="w-4 h-4" />,
      label: "Humidity",
      value: "78%",
      status: "normal"
    },
    {
      icon: <Wind className="w-4 h-4" />,
      label: "Wind Speed",
      value: "15 km/h",
      status: "normal"
    },
    {
      icon: <Sun className="w-4 h-4" />,
      label: "UV Index",
      value: "8",
      status: "high"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Weather Summary */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-card border-0 shadow-card-soft backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-accent" />
            Current Weather Conditions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {weatherStats.map((weather, index) => (
              <motion.div
                key={weather.label}
                className="flex items-center gap-3 p-3 rounded-lg bg-background/50"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className={`p-2 rounded-lg ${
                  weather.status === 'high' ? 'bg-risk-high/10 text-risk-high' :
                  weather.status === 'normal' ? 'bg-risk-safe/10 text-risk-safe' :
                  'bg-muted/10 text-muted-foreground'
                }`}>
                  {weather.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{weather.label}</p>
                  <p className="font-semibold">{weather.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};