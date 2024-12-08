import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HamburgerMenu from "../components/HamburgerMenu";
import CircleMenu from "../components/CircleMenu";
import { fondo, ciene } from "../utils/assets/index.js";
import * as Animatable from "react-native-animatable";
import ProfileSidebar from "../components/ProfileSidebar";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // Recuperar los datos del usuario almacenados
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          setUserInfo(parsedUserInfo);
        } else {
          // Si no hay datos almacenados, redirigir al login
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error al recuperar datos del usuario:', error);
        navigation.replace('Login');
      }
    };

    getUserInfo();
  }, [navigation]);

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={{ marginLeft: 20 }}>
          <Image
            source={{
              uri: "https://xsgames.co/randomusers/avatar.php?g=female",
            }}
            style={{ width: 40, height: 40, borderRadius: 10, top: 10 }}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        !menuVisible && (
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ marginLeft: 20 }}>
            <Ionicons name="menu" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        )
      ),
    });
  }, [navigation, menuVisible]);

  return (
    <View style={styles.container}>
      <HamburgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      
      {sidebarVisible && (
        <ProfileSidebar userInfo={userInfo} onLogout={handleLogout} />
      )}
      
      <Image source={fondo} style={styles.backgroundImage} />
      
      <View style={styles.userInfoContainer}>
        <Text style={styles.userId}>{userInfo?.cNroDocu?.trim() || 'N/A'}</Text>
        <Text style={styles.userName}>{userInfo?.cNomContr || 'Usuario'}</Text>
        <Text style={[
          styles.userStatus,
          { color: userInfo?.Activo === '1' ? '#00FF00' : '#FF0000' }
        ]}>
          {userInfo?.Activo === '1' ? 'Activo' : 'Inactivo'}
        </Text>
      </View>
      
      <View style={styles.circleMenuContainer}>
        {userInfo?.Activo === '1' ? (
          <CircleMenu />
        ) : (
          <Text style={styles.inactiveText}></Text>
        )}
      </View>
      
      <Animatable.Image
        animation="fadeIn"
        easing="ease-in-out"
        source={ciene}
        style={styles.footerImage}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    position: "absolute",
    top: 80,
    left: -170,
    transform: [{ rotate: "22.01deg" }],
    width: 455,
    height: 435,
  },
  userInfoContainer: {
    paddingHorizontal: 24,
    marginTop: 100,
    alignItems: 'flex-start',
  },
  userId: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  userStatus: {
    fontSize: 18,
    marginTop: 5,
  },
  circleMenuContainer: {
    position: 'absolute',
    right: 0,
    top: '25%',
    width: '50%',
    height: '50%',
  },
  inactiveText: {
    color: '#FF0000',
    fontSize: 18,
    textAlign: 'center',
    left: 0,
  },
  footerImage: {
    width: 133,
    height: 213,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});