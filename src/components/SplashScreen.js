import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.replace('LoginScreen');
      }, 3000);

      return () => clearTimeout(timer);
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <Lottie
        source={require('../utils/assets/splash-screen.json')}
        autoPlay
        loop={true}
        speed={0.5} // Reducimos la velocidad a la mitad (1 es la velocidad normal)
        style={styles.animation}
        resizeMode="cover"
        onAnimationFinish={() => {
          navigation.replace('LoginScreen');
        }}
      />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101425',
  },
  animation: {
    width: '70%',
    height: '70%',
  },
  
});

export default SplashScreen;