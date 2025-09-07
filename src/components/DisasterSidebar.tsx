import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  Droplets, 
  Wind, 
  Thermometer, 
  Sun,
  MapPin,
  Heart,
  Shield,
  AlertTriangle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface LayerToggleProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  enabled: boolean;
  color: string;
  onToggle: (enabled: boolean) => void;
}

const LayerToggle: React.FC<LayerToggleProps> = ({ icon, label, count, enabled, color, onToggle }) => (
  <motion.div 
    className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
    whileHover={{ scale: 1.01 }}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>
      <div>
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{count} active</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Badge variant={enabled ? "default" : "secondary"} className="text-xs">
        {count}
      </Badge>
      <Switch 
        checked={enabled} 
        onCheckedChange={onToggle}
        className="scale-75"
      />
    </div>
  </motion.div>
);

export const DisasterSidebar = () => {
  const [layers, setLayers] = useState({
    floods: true,
    cyclones: true,
    droughts: false,
    heatwaves: true,
    hospitals: true,
    shelters: true
  });

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const layerConfigs = [
    {
      key: 'floods' as const,
      icon: <Droplets className="w-4 h-4 text-white" />,
      label: 'Flood Zones',
      count: 23,
      color: 'bg-blue-500'
    },
    {
      key: 'cyclones' as const,
      icon: <Wind className="w-4 h-4 text-white" />,
      label: 'Cyclone Paths',
      count: 8,
      color: 'bg-purple-500'
    },
    {
      key: 'droughts' as const,
      icon: <Sun className="w-4 h-4 text-white" />,
      label: 'Drought Areas',
      count: 15,
      color: 'bg-yellow-500'
    },
    {
      key: 'heatwaves' as const,
      icon: <Thermometer className="w-4 h-4 text-white" />,
      label: 'Heatwave Zones',
      count: 12,
      color: 'bg-red-500'
    },
    {
      key: 'hospitals' as const,
      icon: <Heart className="w-4 h-4 text-white" />,
      label: 'Hospitals',
      count: 156,
      color: 'bg-green-500'
    },
    {
      key: 'shelters' as const,
      icon: <Shield className="w-4 h-4 text-white" />,
      label: 'Emergency Shelters',
      count: 89,
      color: 'bg-indigo-500'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'flood',
      location: 'Mumbai, Maharashtra',
      severity: 'high',
      time: '5 mins ago',
      message: 'Flash flood warning issued for coastal areas'
    },
    {
      id: 2,
      type: 'cyclone',
      location: 'Odisha Coast',
      severity: 'medium',
      time: '12 mins ago',
      message: 'Cyclone intensifying over Bay of Bengal'
    },
    {
      id: 3,
      type: 'heatwave',
      location: 'Rajasthan',
      severity: 'high',
      time: '25 mins ago',
      message: 'Extreme heat advisory for next 48 hours'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-risk-high text-white';
      case 'medium': return 'bg-risk-medium text-white';
      case 'low': return 'bg-risk-low text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <motion.aside 
      className="w-80 h-full bg-gradient-card border-r shadow-card-soft backdrop-blur-sm overflow-y-auto"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 space-y-6">
        {/* Layer Controls */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Map Layers</h2>
          </div>
          
          <div className="space-y-2">
            {layerConfigs.map((config, index) => (
              <motion.div
                key={config.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LayerToggle
                  icon={config.icon}
                  label={config.label}
                  count={config.count}
                  enabled={layers[config.key]}
                  color={config.color}
                  onToggle={() => toggleLayer(config.key)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <Separator />

        {/* AI Predictions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h2 className="font-semibold">AI Predictions</h2>
          </div>
          
          <Card className="p-4 bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Flood Risk (Mumbai)</span>
                <Badge className="bg-risk-high text-white">High</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cyclone Intensity</span>
                <Badge className="bg-risk-medium text-white">Medium</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Drought Probability</span>
                <Badge className="bg-risk-low text-white">Low</Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        <Separator />

        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-risk-high" />
            <h2 className="font-semibold">Recent Alerts</h2>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence>
              {recentAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg bg-background/50 border border-border/50 hover:bg-background/70 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.time}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-1">{alert.location}</p>
                      <p className="text-xs text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <div className="space-y-2">
            <Button className="w-full bg-gradient-primary hover:shadow-disaster transition-all">
              <MapPin className="w-4 h-4 mr-2" />
              Find Nearest Shelter
            </Button>
            <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10">
              <Eye className="w-4 h-4 mr-2" />
              View Full Report
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
};