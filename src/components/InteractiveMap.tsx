import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle, Shield, Heart, Users, Thermometer, Droplets, Wind } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  aiPrediction?: {
    riskScore: number;
    nextUpdate: string;
    factors: string[];
  };
}

interface Facility {
  id: string;
  lat: number;
  lng: number;
  type: 'hospital' | 'shelter';
  name: string;
  capacity: number;
}

interface MapCenterUpdaterProps {
  center: [number, number];
  zoom: number;
}

const MapCenterUpdater: React.FC<MapCenterUpdaterProps> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

interface InteractiveMapProps {
  userLocation: { latitude: number; longitude: number } | null;
  selectedLocation: { lat: number; lng: number; name: string } | null;
  weatherData: any;
}

// Sample disaster zones with AI predictions
const disasterZones: DisasterZone[] = [
  {
    id: '1',
    lat: 28.6139,
    lng: 77.2090,
    radius: 50000,
    riskLevel: 'high',
    type: 'flood',
    population: 32000000,
    nearestHospital: 'AIIMS Delhi',
    lastUpdated: new Date().toISOString(),
    aiPrediction: {
      riskScore: 8.2,
      nextUpdate: '2024-01-15T14:00:00Z',
      factors: ['Heavy rainfall predicted', 'Yamuna river level rising', 'Poor drainage capacity']
    }
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
    lastUpdated: new Date().toISOString(),
    aiPrediction: {
      riskScore: 6.5,
      nextUpdate: '2024-01-15T16:00:00Z',
      factors: ['Cyclone formation in Arabian Sea', 'Wind speed increasing', 'Coastal vulnerability']
    }
  },
  {
    id: '3',
    lat: 13.0827,
    lng: 80.2707,
    radius: 35000,
    riskLevel: 'low',
    type: 'heatwave',
    population: 11000000,
    nearestHospital: 'Apollo Hospital Chennai',
    lastUpdated: new Date().toISOString(),
    aiPrediction: {
      riskScore: 4.1,
      nextUpdate: '2024-01-15T18:00:00Z',
      factors: ['Temperature rising gradually', 'High humidity levels', 'Urban heat island effect']
    }
  }
];

const facilities: Facility[] = [
  { id: '1', lat: 28.5665, lng: 77.2060, type: 'hospital', name: 'AIIMS Delhi', capacity: 2500 },
  { id: '2', lat: 19.0896, lng: 72.8656, type: 'shelter', name: 'Mumbai Emergency Shelter', capacity: 5000 },
  { id: '3', lat: 13.0569, lng: 80.2424, type: 'hospital', name: 'Apollo Chennai', capacity: 1200 },
  { id: '4', lat: 22.5726, lng: 88.3639, type: 'shelter', name: 'Kolkata Relief Center', capacity: 3000 },
  { id: '5', lat: 12.9716, lng: 77.5946, type: 'hospital', name: 'Manipal Hospital Bangalore', capacity: 1800 }
];

const getRiskColor = (level: string) => {
  switch (level) {
    case 'high': return '#ef4444'; // red
    case 'medium': return '#f97316'; // orange
    case 'low': return '#eab308'; // yellow
    case 'safe': return '#22c55e'; // green
    default: return '#6b7280'; // gray
  }
};

const getDisasterIcon = (type: string) => {
  switch (type) {
    case 'flood': return '🌊';
    case 'cyclone': return '🌀';
    case 'heatwave': return '🔥';
    case 'drought': return '🏜️';
    default: return '⚠️';
  }
};

// Custom icons for facilities
const createCustomIcon = (type: 'hospital' | 'shelter') => {
  const emoji = type === 'hospital' ? '🏥' : '🏠';
  return L.divIcon({
    html: `<div style="font-size: 24px;">${emoji}</div>`,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  userLocation, 
  selectedLocation, 
  weatherData 
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // India center
  const [mapZoom, setMapZoom] = useState(5);
  const [key, setKey] = useState(0); // Force re-render

  useEffect(() => {
    if (selectedLocation) {
      setMapCenter([selectedLocation.lat, selectedLocation.lng]);
      setMapZoom(10);
      setKey(prev => prev + 1); // Force re-render
    } else if (userLocation) {
      setMapCenter([userLocation.latitude, userLocation.longitude]);
      setMapZoom(10);
      setKey(prev => prev + 1); // Force re-render
    }
  }, [userLocation, selectedLocation]);

  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow-disaster">
      <MapContainer
        key={key}
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User location marker */}
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">Your Location</h3>
                {weatherData && (
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4" />
                      <span>{weatherData.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4" />
                      <span>{weatherData.humidity}% humidity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4" />
                      <span>{weatherData.windSpeed} km/h</span>
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Disaster zones */}
        {disasterZones.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            pathOptions={{
              fillColor: getRiskColor(zone.riskLevel),
              fillOpacity: 0.3,
              color: getRiskColor(zone.riskLevel),
              weight: 2
            }}
          >
            <Popup>
              <Card className="border-0 shadow-none max-w-sm">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{getDisasterIcon(zone.type)}</span>
                    <h3 className="font-semibold capitalize">{zone.type} Risk Zone</h3>
                    <Badge 
                      style={{ backgroundColor: getRiskColor(zone.riskLevel), color: 'white' }}
                      className="border-0"
                    >
                      {zone.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Population: {(zone.population / 1000000).toFixed(1)}M</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span>Nearest Hospital: {zone.nearestHospital}</span>
                    </div>
                    
                    {zone.aiPrediction && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          🤖 AI Prediction
                        </h4>
                        <div className="space-y-1 text-xs">
                          <div>Risk Score: <strong>{zone.aiPrediction.riskScore}/10</strong></div>
                          <div className="space-y-1">
                            <div className="font-medium">Key Factors:</div>
                            {zone.aiPrediction.factors.map((factor, index) => (
                              <div key={index}>• {factor}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground">
                      Last updated: {new Date(zone.lastUpdated).toLocaleString()}
                    </div>
                  </div>
                </div>
              </Card>
            </Popup>
          </Circle>
        ))}
        
        {/* Facilities */}
        {facilities.map((facility) => (
          <Marker
            key={facility.id}
            position={[facility.lat, facility.lng]}
            icon={createCustomIcon(facility.type)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{facility.name}</h3>
                <div className="mt-1 text-sm">
                  <div>Type: {facility.type === 'hospital' ? 'Hospital' : 'Emergency Shelter'}</div>
                  <div>Capacity: {facility.capacity.toLocaleString()}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};