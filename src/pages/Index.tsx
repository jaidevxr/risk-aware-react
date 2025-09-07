import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DisasterNavbar } from '@/components/DisasterNavbar';
import { DisasterSidebar } from '@/components/DisasterSidebar';
import { SimpleMap } from '@/components/SimpleMap';
import { DashboardStats } from '@/components/DashboardStats';
import { DisasterCharts } from '@/components/DisasterCharts';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useWeatherData } from '@/hooks/useWeatherData';

const Index = () => {
  const { location: userLocation, loading: locationLoading, error: locationError } = useUserLocation();
  const { weatherData, loading: weatherLoading } = useWeatherData(userLocation);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);

  const handleFilterChange = (filter: string) => {
    console.log('Filter changed:', filter);
  };

  const handleRefresh = () => {
    console.log('Refreshing data...');
  };

  const handleLocationSelect = (location: { lat: number; lng: number; name: string }) => {
    setSelectedLocation(location);
    console.log('Location selected:', location);
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Navigation */}
      <DisasterNavbar 
        onFilterChange={handleFilterChange} 
        onRefresh={handleRefresh}
        onLocationSelect={handleLocationSelect}
        userLocation={userLocation}
      />
      
      {/* Main Layout */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Sidebar */}
        <DisasterSidebar />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Stats Dashboard */}
          <motion.div 
            className="p-6 pb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DashboardStats weatherData={weatherData} userLocation={userLocation} />
          </motion.div>
          
          {/* Map and Charts Container */}
          <div className="flex-1 px-6 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <motion.div 
              className="lg:col-span-2 bg-background/30 rounded-xl backdrop-blur-sm shadow-card-soft overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SimpleMap 
                userLocation={userLocation}
                selectedLocation={selectedLocation}
                weatherData={weatherData}
              />
            </motion.div>
            
            {/* Charts */}
            <motion.div 
              className="space-y-6 overflow-y-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <DisasterCharts />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;