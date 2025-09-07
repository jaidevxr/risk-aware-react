import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  description: string;
  uvIndex: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

export const useWeatherData = (location: Location | null) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        // For demo purposes, we'll simulate weather data
        // In production, you'd use OpenWeatherMap API via Supabase Edge Functions
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        
        const simulatedData: WeatherData = {
          temperature: Math.round(25 + Math.random() * 15), // 25-40°C
          humidity: Math.round(60 + Math.random() * 30), // 60-90%
          windSpeed: Math.round(5 + Math.random() * 20), // 5-25 km/h
          rainfall: Math.round(Math.random() * 50), // 0-50mm
          description: ['Clear sky', 'Partly cloudy', 'Overcast', 'Light rain'][Math.floor(Math.random() * 4)],
          uvIndex: Math.round(3 + Math.random() * 8) // 3-11
        };

        setWeatherData(simulatedData);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  return { weatherData, loading, error };
};