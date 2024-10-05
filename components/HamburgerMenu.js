import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const HamburgerMenu = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const slideAnim = React.useRef(new Animated.Value(-width / 2)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -width / 2,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, slideAnim]);


  const menuItems = [
    { title: 'Contacto', screen: 'Contact' },
    { title: 'Opiniones', screen: 'Reviews' },
    { title: 'Ayuda', screen: 'Help' },
    { title: 'Emergencias', screen: 'Emergency' },
  ];

  const handleMenuItemPress = (screen) => {
    onClose();
    navigation.navigate(screen);
  };

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item.screen)}
          >
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1000,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menu: {
      position: 'absolute',
      top: STATUSBAR_HEIGHT,
      left: 0,
      width: width / 2,
      height: '100%',
      backgroundColor: '#474747',
      padding: 20,
      paddingTop: 20 + STATUSBAR_HEIGHT,
    },
    closeButton: {
      position: 'absolute',
      top:  20,
      right: 20,
      zIndex: 1,
    },
    menuItem: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    menuItemText: {
      fontSize: 18,
      color: '#FFFFFF',
    },
  });

export default HamburgerMenu;