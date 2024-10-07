import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { Avatar, logo, gastronomia, mascotas, jardineria, salud, tecnologia, automotriz, lavanderia, viajes, gimnasio, belleza } from "../assets";
import MenuContainer from "../components/MenuContainer";
import ItemCard from "../components/ItemCarDontainer";
import comercialesData from '../data/datos.json';

const GOOGLE_PLACES_API_KEY = "3deb0a07ddmshadfd9cff2ce93a1p1dfc59jsnf80db7075fc1"; // Replace with your actual API key

const Comerciales = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [location, setLocation] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setMainData(comercialesData);
  }, []);

  const handleLocationSelect = (data, details = null) => {
    setLocation({
      latitude: details?.geometry?.location?.lat,
      longitude: details?.geometry?.location?.lng,
    });
    // Here you can add logic to filter or fetch data based on the selected location
  };

  const menuItems = [
    { key: "gastronomia", title: "Gastronomía", imageSrc: gastronomia },
    { key: "jardineria", title: "Jardinería", imageSrc: jardineria },
    { key: "mascotas", title: "Mascotas", imageSrc: mascotas },
    { key: "tecnologia", title: "Tecnología", imageSrc: tecnologia },
    { key: "salud", title: "Salud", imageSrc: salud },
    { key: "belleza", title: "Belleza", imageSrc: belleza },
    { key: "gimnasio", title: "Gimnasios", imageSrc: gimnasio },
    { key: "viajes", title: "Viajes", imageSrc: viajes },
    { key: "automotriz", title: "Automotriz", imageSrc: automotriz },
    { key: "lavanderia", title: "Lavanderías", imageSrc: lavanderia },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.avatarContainer}>
          <Image source={Avatar} style={styles.avatar} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={handleLocationSelect}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
          }}
          styles={{
            textInput: styles.searchInput,
            container: { flex: 0 },
            listView: { backgroundColor: 'white' }
          }}
        />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#474747" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menuScrollView}>
            {menuItems.map((item) => (
              <MenuContainer
                key={item.key}
                title={item.title}
                imageSrc={item.imageSrc}
                type={type}
                setType={setType}
              />
            ))}
          </ScrollView>

          <View style={styles.cardContainer}>
            <ItemCard />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  logo: {
    width: 200,
    height: 40,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#e0e0e0',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuScrollView: {
    paddingHorizontal: 16,
  },
  cardContainer: {
    paddingHorizontal: 16,
  },
});

export default Comerciales;