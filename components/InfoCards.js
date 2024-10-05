import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const InfoCards = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const slides = [
    {
      icon: require('../assets/soporte.png'),
      title: 'Beneficios Municipales',
      
    },
    {
      icon: require('../assets/comercial.png'),
      title: 'Comercios',
      
    },
    {
      icon: require('../assets/mapa.png'),
      title: 'Mapas',
      
    },
    {
        icon: require('../assets/soporte.png'),
        title: 'Beneficios Municipales',
        
      },
      {
        icon: require('../assets/comercial.png'),
        title: 'Comercios',
        
      },
      {
        icon: require('../assets/mapa.png'),
        title: 'Mapas',
        
      },
  ];

  const slide = (index) => {
    setSlideIndex(index);
  };

  return (
    <View style={{ flex: 1,  }}>
  <View style={{ height: 200, width: 200, borderRadius: 50, overflow: 'hidden', marginLeft: 0, justifyContent: 'center', alignItems: 'flex-start'  }}>
    <LinearGradient
      colors={['#00a0fa', '#005685']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, borderRadius: 200, padding: 10 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View
          style={{
            transform: [{ translateY: -(300 - 15) * (slideIndex - 1) }],
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {slides.map((slide, index) => (
            <View key={index} style={{ height: 100, alignItems: 'center' }}>
             
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>
                {slide.title}
              </Text>
            </View>
          ))}
        </Animated.View>
      </View>
    </LinearGradient>
  </View>
  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}>
    {slides.map((slide, index) => (
      <TouchableOpacity
        key={index}
        style={{
          width: 50,
          height: 50,
          marginBottom: 0,
          position: 'absolute', // Agregamos position absolute
          left: 25, // Centramos horizontalmente
          top: 25 + (index * 100), // Distribuimos verticalmente
          transform: [{ rotateZ: `${(index * -180) / (slides.length - 1)}deg` }], // Rotamos cada elemento
        }}
        onPress={() => slide(index + 1)}
      >
        <Image source={slide.icon} style={{ width: 50, height: 50 }} />
      </TouchableOpacity>
    ))}
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 50,
        padding: 5,
        boxSizing: 'content-box',
        transformOrigin: [200, 0, 0],
        left: -80,
        bottom: 120,
        transition: 'transform 0.5s',
      }}
    />
  </View>
</View>
  );
};

export default InfoCards;