import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Settings, RefreshCw, Download, AlertTriangle, Shield, MapPin } from 'lucide-react';
import { LocationSearch } from './LocationSearch';

interface DisasterNavbarProps {
  onFilterChange?: (filter: string) => void;
  onRefresh?: () => void;
  onLocationSelect: (location: { lat: number; lng: number; name: string }) => void;
  userLocation: { latitude: number; longitude: number } | null;
}

export const DisasterNavbar: React.FC<DisasterNavbarProps> = ({ 
  onFilterChange, 
  onRefresh, 
  onLocationSelect,
  userLocation 
}) => {
  return (
    <motion.nav 
      className="w-full bg-gradient-card border-b shadow-card-soft backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-2 bg-gradient-primary rounded-xl shadow-disaster">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Disaster Response Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">Real-time monitoring & AI predictions</p>
            </div>
          </motion.div>

          {/* Search and Controls */}
          <div className="flex items-center gap-4">
            {/* Location Search */}
            <div className="w-64">
              <LocationSearch onLocationSelect={onLocationSelect} />
            </div>

            {/* User Location Status */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {userLocation ? 'GPS Active' : 'No GPS'}
              </span>
              {userLocation && (
                <Badge variant="outline" className="bg-risk-safe/10 text-risk-safe border-risk-safe/20">
                  Live
                </Badge>
              )}
            </div>

            {/* Disaster Type Filter */}
            <Select onValueChange={onFilterChange}>
              <SelectTrigger className="w-40 bg-background/50 border-primary/20">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="flood">Floods</SelectItem>
                <SelectItem value="cyclone">Cyclones</SelectItem>
                <SelectItem value="drought">Droughts</SelectItem>
                <SelectItem value="heatwave">Heatwaves</SelectItem>
              </SelectContent>
            </Select>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onRefresh}
                  className="bg-background/50 border-primary/20 hover:bg-primary/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-background/50 border-secondary/20 hover:bg-secondary/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </motion.div>
            </div>

            {/* Alerts Indicator */}
            <motion.div 
              className="relative"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Button 
                variant="outline" 
                size="sm"
                className="bg-background/50 border-risk-high/20 hover:bg-risk-high/10"
              >
                <Bell className="w-4 h-4 mr-2" />
                Alerts
                <Badge className="ml-2 bg-risk-high text-white border-0">
                  12
                </Badge>
              </Button>
            </motion.div>

            {/* Settings */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm"
                className="hover:bg-muted/50"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Status Bar */}
        <motion.div 
          className="flex items-center justify-between mt-4 pt-4 border-t border-border/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-risk-high rounded-full animate-pulse" />
              <span className="text-muted-foreground">High Risk: <span className="font-semibold text-foreground">23 zones</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-risk-medium rounded-full" />
              <span className="text-muted-foreground">Medium Risk: <span className="font-semibold text-foreground">45 zones</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-risk-safe rounded-full" />
              <span className="text-muted-foreground">Safe: <span className="font-semibold text-foreground">156 zones</span></span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <AlertTriangle className="w-3 h-3" />
            <span>Last updated: 2 minutes ago</span>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};