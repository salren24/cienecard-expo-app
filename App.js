import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';
// import 'react-native-get-random-values';
// import { polyfillWebCrypto } from 'react-native-crypto';

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Comerciales from "./screens/Comerciales";
import Municipales from "./screens/Municipales";
import Ubicaciones from './screens/Ubicaciones';
import ItemScreen from "./screens/ItemScreen";

const Stack = createNativeStackNavigator();
// polyfillWebCrypto();

export default function App() {
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
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator>
          <Stack.Screen 
            name="LoginScreen" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Comerciales" component={Comerciales} />
          <Stack.Screen name="Municipales" component={Municipales} />
          <Stack.Screen name="Ubicaciones" component={Ubicaciones} /> 
          <Stack.Screen name="ItemScreen" component={ItemScreen} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}