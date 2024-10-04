import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';


const MENU_ITEMS = [
  { 
    image: require('../assets/App/Soporte.png'), 
    color: '#6AE160', 
    rotation: 10, 
    displayName: 'Beneficios Municipales', 
    navigateTo: 'Municipales'
  },
  { 
    image: require('../assets/App/Comercial.png'), 
    color: '#FDFF92', 
    rotation: 0, 
    displayName: 'Beneficios Comerciales', 
    navigateTo: 'Comerciales'
  },
  { 
    image: require('../assets/App/mapa.png'), 
    color: '#FF8484', 
    rotation: -10, 
    displayName: 'Mapas Comerciales', 
    navigateTo: 'Ubicaciones'
  },
];

const CircleMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigation = useNavigation();
  const timerRef = useRef(null);

 

  const handlePress = (index, navigateTo) => {
    if (selectedIndex === index) {
      navigation.navigate(navigateTo);
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {MENU_ITEMS.map((item, index) => {
        const isSelected = index === selectedIndex;
        const buttonScale = useSharedValue(1);

        useEffect(() => {
          buttonScale.value = withTiming(isSelected ? 1.1 : 1, {
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          });
        }, [isSelected]);

        const buttonStyle = useAnimatedStyle(() => {
          let zIndexValue;
          if (index === 1) {
            zIndexValue = isSelected ? 5 : 3;
          } else if (isSelected) {
            zIndexValue = 4;
          } else {
            zIndexValue = 2;
          }
          return {
            transform: [
              { rotate: `${item.rotation}deg` },
              { scale: buttonScale.value },
            ],
            zIndex: zIndexValue,
          };
        });

        return (
          <Animated.View 
            key={index} 
            style={[
              styles.menuItem,
              index === 1 && styles.middleMenuItem,
              index === 0 && styles.topMenuItem,
              index === 2 && styles.bottomMenuItem,
              buttonStyle,
            ]}
          >
            <TouchableOpacity 
              style={[
                styles.button, 
                { backgroundColor: item.color },
                index === 1 && styles.middleButton,
                index === 0 && styles.topButton,
                index === 2 && styles.bottomButton,
              ]}
              onPress={() => handlePress(index, item.navigateTo)}
            >
              {!isSelected && (
                <Image 
                  source={item.image} 
                  style={[
                    styles.buttonImage,
                    index === 1 && styles.middleButtonImage,
                    index === 0 && styles.topButtonImage,
                    index === 2 && styles.bottomButtonImage,
                  ]} 
                />
              )}
              {isSelected && (
                <Text style={styles.buttonText}>{item.displayName}</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: -100,
    top: 0,
    bottom: -210,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  menuItem: {
    marginVertical: -60,
  },
  middleMenuItem: {
    marginVertical: 0, // Adjust spacing for larger middle button
  },
  topMenuItem: {
    marginBottom: -60,
  },
  bottomMenuItem: {
    marginTop: -60,
  },
  button: {
    width: 290,
    height: 230,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  middleButton: {
    width: 300, // Larger size for middle button
    height: 250, // Larger size for middle button
    borderRadius: 15,
    left:-50 // Slightly larger border radius to maintain proportion
  },
  topButton: {
    width: 290,
    height: 230,
    borderRadius: 15,
  },
  bottomButton: {
    width: 290,
    height: 230,
    borderRadius: 15,
  },
  buttonImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    left:-50
  },
  middleButtonImage: {
    width: 200, // Larger image for middle button
    height: 200,
    left:-30,
    top:-20 // Larger image for middle button
  },
  topButtonImage: {
    width: 200,
    height: 200,
    top:-20
  },
  bottomButtonImage: {
    width: 200,
    height: 200,
    bottom:-20
  },
  nameText: {
    position: 'absolute',
    left: '-70%', // Changed from 'right' to 'left'
    top: '5%', // Center vertically
    transform: [{ translateY: -12 }], // Adjust vertical position (half of the font size)
    fontSize: 24,
    fontWeight: 'bold',
    width:200,
    textAlign:'center'
  },
  buttonText: {
    position: 'absolute',
    textAlign:'center', 
    color: '#000',
    fontSize: 16,
    // fontWeight: 'bold',
    padding: 5,
    width:150,
    borderRadius: 5,
    fontFamily: 'System',
    
  },
});

export default CircleMenu;