import React, { createContext, useState, useContext, useEffect } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getLocation = async () => {
    try {
      setIsLoading(true);
      setLocationError(null);

      const serviceEnabled = await Location.hasServicesEnabledAsync();
      if (!serviceEnabled) {
        setLocationError('Los servicios de ubicación están desactivados');
        // Set default location
        setUserLocation({
          latitude: -12.111161,
          longitude: -76.819539,
        });
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permiso de ubicación denegado');
        // Set default location
        setUserLocation({
          latitude: -12.111161,
          longitude: -76.819539,
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
        maximumAge: 10000,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('Error de ubicación:', error);
      setLocationError(error.message);
      // Set default location
      setUserLocation({
        latitude: -12.111161,
        longitude: -76.819539,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initLocation = async () => {
      if (mounted) {
        await getLocation();
      }
    };

    initLocation();

    return () => {
      mounted = false;
    };
  }, []);

  const value = {
    userLocation,
    locationError,
    isLoading,
    refreshLocation: getLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;