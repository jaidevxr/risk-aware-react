import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Heart, Users, Thermometer, Droplets, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DisasterZone {
  id: string;
  lat: number;
  lng: number;
  radius: number;
  riskLevel: 'high' | 'medium' | 'low' | 'safe';
  type: 'flood' | 'cyclone' | 'drought' | 'heatwave';
  population: number;
  nearestHospital: string;
  lastUpdated: string;
}

interface Facility {
  id: string;
  lat: number;
  lng: number;
  type: 'hospital' | 'shelter';
  name: string;
  capacity: number;
}

const mockDisasterZones: DisasterZone[] = [
  {
    id: '1',
    lat: 28.6139,
    lng: 77.2090,
    radius: 50000,
    riskLevel: 'high',
    type: 'flood',
    population: 32000000,
    nearestHospital: 'AIIMS Delhi',
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    lat: 19.0760,
    lng: 72.8777,
    radius: 40000,
    riskLevel: 'medium',
    type: 'cyclone',
    population: 20000000,
    nearestHospital: 'Tata Memorial Hospital',
    lastUpdated: '2024-01-15T11:15:00Z'
  },
  {
    id: '3',
    lat: 13.0827,
    lng: 80.2707,
    radius: 35000,
    riskLevel: 'low',
    type: 'heatwave',
    population: 11000000,
    nearestHospital: 'Apollo Hospital',
    lastUpdated: '2024-01-15T09:45:00Z'
  }
];

const mockFacilities: Facility[] = [
  { id: '1', lat: 28.5665, lng: 77.2060, type: 'hospital', name: 'AIIMS Delhi', capacity: 2500 },
  { id: '2', lat: 19.0896, lng: 72.8656, type: 'shelter', name: 'Mumbai Emergency Shelter', capacity: 5000 },
  { id: '3', lat: 13.0569, lng: 80.2424, type: 'hospital', name: 'Apollo Chennai', capacity: 1200 }
];

const getRiskColor = (level: string) => {
  switch (level) {
    case 'high': return 'bg-risk-high';
    case 'medium': return 'bg-risk-medium';
    case 'low': return 'bg-risk-low';
    case 'safe': return 'bg-risk-safe';
    default: return 'bg-muted';
  }
};

const getDisasterIcon = (type: string) => {
  switch (type) {
    case 'flood': return <Droplets className="w-4 h-4" />;
    case 'cyclone': return <AlertTriangle className="w-4 h-4" />;
    case 'heatwave': return <Thermometer className="w-4 h-4" />;
    case 'drought': return <AlertTriangle className="w-4 h-4" />;
    default: return <AlertTriangle className="w-4 h-4" />;
  }
};

export const DisasterMap = () => {
  const [activeZones] = useState<DisasterZone[]>(mockDisasterZones);
  const [facilities] = useState<Facility[]>(mockFacilities);
  const [selectedZone, setSelectedZone] = useState<DisasterZone | null>(null);

  return (
    <motion.div 
      className="h-full w-full relative rounded-xl overflow-hidden shadow-disaster"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Interactive Map Placeholder */}
      <div className="h-full w-full bg-gradient-to-br from-blue-50 to-teal-50 relative">
        {/* Map of India Outline - SVG */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 800 600" 
          fill="none"
        >
          {/* India outline */}
          <path
            d="M200 150 L300 120 L400 140 L500 130 L580 160 L620 200 L600 280 L580 350 L520 420 L450 480 L380 500 L320 480 L280 450 L250 400 L220 350 L200 300 Z"
            fill="hsl(var(--background))"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            className="opacity-30"
          />
          
          {/* Disaster zones as circles */}
          {activeZones.map((zone, index) => (
            <motion.g
              key={zone.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <circle
                cx={200 + index * 150 + Math.random() * 100}
                cy={200 + index * 80 + Math.random() * 50}
                r={zone.riskLevel === 'high' ? 30 : zone.riskLevel === 'medium' ? 20 : 15}
                className={`${getRiskColor(zone.riskLevel).replace('bg-', 'fill-')} opacity-40 cursor-pointer hover:opacity-60 transition-opacity`}
                onClick={() => setSelectedZone(zone)}
              />
              <circle
                cx={200 + index * 150 + Math.random() * 100}
                cy={200 + index * 80 + Math.random() * 50}
                r={3}
                className={`${getRiskColor(zone.riskLevel).replace('bg-', 'fill-')} cursor-pointer`}
                onClick={() => setSelectedZone(zone)}
              />
            </motion.g>
          ))}
          
          {/* Facilities as markers */}
          {facilities.map((facility, index) => (
            <motion.g
              key={facility.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <circle
                cx={250 + index * 120 + Math.random() * 80}
                cy={180 + index * 90 + Math.random() * 60}
                r="8"
                fill={facility.type === 'hospital' ? '#ef4444' : '#3b82f6'}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
              <text
                x={250 + index * 120 + Math.random() * 80}
                y={195 + index * 90 + Math.random() * 60}
                textAnchor="middle"
                className="text-xs fill-foreground font-medium"
              >
                {facility.type === 'hospital' ? '🏥' : '🏠'}
              </text>
            </motion.g>
          ))}
        </svg>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
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
        
        {/* Zone Details Popup */}
        {selectedZone && (
          <motion.div
            className="absolute bottom-4 left-4 max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Card className="p-4 bg-background/90 backdrop-blur-sm shadow-intense">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getDisasterIcon(selectedZone.type)}
                  <h3 className="font-semibold capitalize">{selectedZone.type} Risk Zone</h3>
                </div>
                <button 
                  onClick={() => setSelectedZone(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Risk Level:</span>
                  <Badge className={`${getRiskColor(selectedZone.riskLevel)} text-white border-0`}>
                    {selectedZone.riskLevel.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>Population: {(selectedZone.population / 1000000).toFixed(1)}M</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>Nearest Hospital: {selectedZone.nearestHospital}</span>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date(selectedZone.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Gradient overlay for aesthetics */}
        <div className="absolute inset-0 bg-gradient-overlay pointer-events-none" />
      </div>
    </motion.div>
  );
};