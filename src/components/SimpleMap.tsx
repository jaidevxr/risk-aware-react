import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Heart, Users, Thermometer, Droplets, Wind } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SimpleMapProps {
  userLocation: { latitude: number; longitude: number } | null;
  selectedLocation: { lat: number; lng: number; name: string } | null;
  weatherData: any;
}

export const SimpleMap: React.FC<SimpleMapProps> = ({ 
  userLocation, 
  selectedLocation, 
  weatherData 
}) => {
  const [selectedZone, setSelectedZone] = useState<any>(null);

  // Mock disaster zones for demonstration
  const disasterZones = [
    {
      id: '1',
      name: 'Delhi Flood Zone',
      riskLevel: 'high',
      type: 'flood',
      population: 32000000,
      left: '20%',
      top: '30%'
    },
    {
      id: '2', 
      name: 'Mumbai Cyclone Zone',
      riskLevel: 'medium',
      type: 'cyclone',
      population: 20000000,
      left: '15%',
      top: '60%'
    },
    {
      id: '3',
      name: 'Chennai Heatwave Zone', 
      riskLevel: 'low',
      type: 'heatwave',
      population: 11000000,
      left: '40%',
      top: '80%'
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-risk-high';
      case 'medium': return 'bg-risk-medium'; 
      case 'low': return 'bg-risk-low';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="h-full w-full relative rounded-xl overflow-hidden shadow-disaster bg-gradient-to-br from-blue-50 to-teal-50">
      {/* India Map Outline */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
        <path
          d="M200 150 L300 120 L400 140 L500 130 L580 160 L620 200 L600 280 L580 350 L520 420 L450 480 L380 500 L320 480 L280 450 L250 400 L220 350 L200 300 Z"
          fill="hsl(var(--background))"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          className="opacity-30"
        />
      </svg>

      {/* Disaster Zones */}
      {disasterZones.map((zone, index) => (
        <motion.div
          key={zone.id}
          className={`absolute w-12 h-12 ${getRiskColor(zone.riskLevel)} rounded-full opacity-40 cursor-pointer hover:opacity-60 transition-opacity`}
          style={{ left: zone.left, top: zone.top }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.2 }}
          onClick={() => setSelectedZone(zone)}
        />
      ))}

      {/* User Location Marker */}
      {userLocation && (
        <motion.div
          className="absolute w-4 h-4 bg-primary rounded-full"
          style={{ left: '30%', top: '50%' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="absolute inset-0 bg-primary rounded-full animate-ping" />
        </motion.div>
      )}

      {/* Selected Location */}
      {selectedLocation && (
        <motion.div
          className="absolute w-6 h-6 bg-secondary rounded-full border-2 border-white"
          style={{ left: '25%', top: '45%' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
      )}

      {/* Zone Details Popup */}
      {selectedZone && (
        <motion.div
          className="absolute bottom-4 left-4 max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 bg-background/90 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{selectedZone.name}</h3>
              <button onClick={() => setSelectedZone(null)}>✕</button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Risk Level:</span>
                <Badge className={`${getRiskColor(selectedZone.riskLevel)} text-white`}>
                  {selectedZone.riskLevel.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Population: {(selectedZone.population / 1000000).toFixed(1)}M</span>
              </div>
              {weatherData && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">🤖 Current Conditions</h4>
                  <div className="space-y-1 text-xs">
                    <div>Temperature: {weatherData.temperature}°C</div>
                    <div>Humidity: {weatherData.humidity}%</div>
                    <div>Wind: {weatherData.windSpeed} km/h</div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Map Legend */}
      <div className="absolute top-4 right-4">
        <Card className="p-2 bg-background/80 backdrop-blur-sm">
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-risk-high rounded-full"></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-risk-medium rounded-full"></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-risk-low rounded-full"></div>
              <span>Low Risk</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};