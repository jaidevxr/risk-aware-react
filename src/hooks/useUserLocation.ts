import { useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationError {
  message: string;
  code: number;
}

export const useUserLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<LocationError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        message: 'Geolocation is not supported by this browser.',
        code: 0
      });
      setLoading(false);
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      setLoading(false);
    };

    const handleError = (error: GeolocationPositionError) => {
      setError({
        message: error.message,
        code: error.code
      });
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 600000 // 10 minutes
    });
  }, []);

  return { location, error, loading };
};