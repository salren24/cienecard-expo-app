import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';
import * as Location from 'expo-location';

import { LocationProvider } from './src/components/LocationContext';
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Comerciales from "./src/screens/Comerciales";
import Municipales from "./src/screens/Municipales";
import Ubicaciones from './src/screens/Ubicaciones';
import ItemScreen from "./src/screens/ItemScreen";
import SplashScreen from 'components/SplashScreen';

const Stack = createNativeStackNavigator();
// polyfillWebCrypto();

export default function App() {

  const [userLocation, setUserLocation] = useState(null);
  


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let inactivityTimer;

  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, 5 * 60 * 1000); // 5 minutes
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!userToken);
    };

    checkLoginStatus();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        resetInactivityTimer();
      } else if (nextAppState === 'background') {
        if (inactivityTimer) clearTimeout(inactivityTimer);
      }
    });

    async function activateKeepAwake() {
      await activateKeepAwakeAsync();
      console.log('KeepAwake activado');
    }
    activateKeepAwake();
  
    const timer = setTimeout(async () => {
      deactivateKeepAwake();
      console.log('KeepAwake desactivado');
    }, 5000);
  
    return () => {
      subscription.remove();
      if (inactivityTimer) clearTimeout(inactivityTimer);
      clearTimeout(timer);
      deactivateKeepAwake();
    };
  }, []);

  return (
    <LocationProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen 
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="LoginScreen" 
              component={LoginScreen} 
              options={{ headerShown: false }}
              initialParams={{ userLocation: userLocation }}
            />
            <Stack.Screen name="Home" component={HomeScreen} initialParams={{ userLocation: userLocation }} />
            <Stack.Screen 
              name="Comerciales" 
              component={Comerciales}
              initialParams={{ userLocation: userLocation }}
            />
            <Stack.Screen name="Municipales" component={Municipales} initialParams={{ userLocation: userLocation }} />
            <Stack.Screen name="Ubicaciones" component={Ubicaciones} initialParams={{ userLocation: userLocation }} /> 
            <Stack.Screen name="ItemScreen" component={ItemScreen} initialParams={{ userLocation: userLocation }} /> 
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </LocationProvider>
  );
}