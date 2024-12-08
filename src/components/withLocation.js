import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocation } from '../contexts/LocationContext';

const withLocation = (WrappedComponent) => {
  return function LocationAwareScreen(props) {
    const { userLocation, locationError, isLoading, refreshLocation } = useLocation();

    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#474747" />
          <Text style={styles.loadingText}>Obteniendo ubicación...</Text>
        </View>
      );
    }

    if (locationError && !userLocation) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>{locationError}</Text>
          <TouchableOpacity 
            onPress={refreshLocation}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Pasar la ubicación como prop al componente envuelto
    return <WrappedComponent {...props} userLocation={userLocation} />;
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default withLocation;