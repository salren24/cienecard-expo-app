import React, { useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import 'react-native-gesture-handler';

import HomeScreen from "./screens/HomeScreen"
import Comerciales from "./screens/Comerciales";
import Municipales from "./screens/Municipales";
import Ubicaciones from './screens/Ubicaciones';
import ItemScreen from "./screens/ItemScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Activar keepAwake
    async function activateKeepAwake() {
      await activateKeepAwakeAsync();
      console.log('KeepAwake activado');
    }
    activateKeepAwake();
  
    // Configurar un temporizador para desactivar keepAwake después de 5 segundos
    const timer = setTimeout(async () => {
      deactivateKeepAwake();
      console.log('KeepAwake desactivado');
    }, 5000);
  
    // Limpiar el temporizador y desactivar keepAwake cuando el componente se desmonte
    return () => {
      clearTimeout(timer);
      deactivateKeepAwake();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator>
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