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
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";

import { Avatar, logo } from "../utils/assets";
import MenuContainer from "../components/MenuContainer";
import ItemCard from "../components/ItemCarDontainer";
import municipalesData from '../utils/data/municipales.json';

const Municipales = ({route}) => {
  const navigation = useNavigation();
  const { userLocation } = route.params;
  const insets = useSafeAreaInsets();

  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);

  // Oculta el header por defecto
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Carga inicial de datos
  useEffect(() => {
    setMainData(municipalesData);
  }, []);

  // Obtiene categorías únicas incluyendo 'todos' como primera opción
  const uniqueCategories = ['todos', ...new Set(municipalesData.map(item => item.categoria))];

  // Mapea los items del menú con sus respectivas imágenes
  const menuItems = uniqueCategories.map(category => ({
    key: category,
    title: category === 'todos' ? 'Todos' : category,
    imageSrc: category === 'todos' ? require('../utils/assets/Todos.png') : { uri: municipalesData.find(item => item.categoria === category)['icono-cat'] }
  }));

  // Función para filtrar las tarjetas por categoría
  const filterCardsByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'todos') {
      setMainData(municipalesData);
    } else {
      const filteredData = municipalesData.filter(item => item.categoria === category);
      setMainData(filteredData);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar style="auto" />
      {/* Header con logo y avatar */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.avatarContainer}>
          <Image source={Avatar} style={styles.avatar} />
        </View>
      </View>
      {/* Menú de categorías horizontal */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menuScrollView}>
        {menuItems.map((item) => (
          <MenuContainer
            key={item.key}
            title={item.title}
            imageSrc={item.imageSrc}
            type={selectedCategory}
            setType={filterCardsByCategory}
          />
        ))}
      </ScrollView>
      {/* Contenido principal con indicador de carga */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          {/* <ActivityIndicator size="large" color="#474747" /> */}
        </View>
      ) : (
        <ScrollView 
          style={styles.cardScrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardContainer}>
            <ItemCard data={mainData} userLocation={userLocation} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos del contenedor principal
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  // Estilos del header
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
  // Estilos del contenedor del avatar
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
  // Estilos del contenedor de búsqueda
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
  // Estilos del contenedor de carga
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Estilos del menú horizontal
  menuScrollView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    height:200,
  },
  // Estilos del contenedor de tarjetas
  cardContainer: {
    paddingHorizontal: 10,
  },
  // Nuevos estilos para las imágenes del MenuContainer
  menuItemImage: {
    width: 5,
    height: 5,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
  menuItemSelected: {
    backgroundColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 14,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  menuItemTextSelected: {
    fontWeight: 'bold',
    color: '#000',
  }
});

export default Municipales;