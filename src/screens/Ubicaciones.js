                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, Animated, TextInput, Image, Linking, Modal, TouchableWithoutFeedback, PanResponder } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, NotFound } from "../utils/assets";
import { useLocation } from '../components/LocationContext';

import data from '../utils/data/datos.json';

const { width, height } = Dimensions.get('window');

const PANEL_HEIGHT = 220;
const PANEL_HANDLE_HEIGHT = 20;

const Ubicaciones = () => {
  const { userLocation, locationError, isLoading } = useLocation();
  const [markers, setMarkers] = useState([]);
  const [categories, setCategories] = useState({});
  const [categoryIcons, setCategoryIcons] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const mapRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(-width * 0.5)).current;
  const [bottomPanelHeight] = useState(new Animated.Value(PANEL_HEIGHT));
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const panelY = useRef(new Animated.Value(0)).current;

  const imageScrollRef = useRef(null);

 

  useEffect(() => {
    const newMarkers = data.map(item => ({
      id: item.id,
      coordinate: {
        latitude: item.coordenadas.latitud,
        longitude: item.coordenadas.longitud,
      },
      title: item.nombre,
      category: item.categoria,
      image: item.img,
      logo: item.logo,
      ruta: item.ruta,
      ofertas: item.oferta,
      numero: item.numero,
      iconoCat: item['icono-cat']
    }));
    setMarkers(newMarkers);

    const newCategories = data.reduce((acc, item) => {
      if (!acc[item.categoria]) {
        acc[item.categoria] = [];
      }
      acc[item.categoria].push({ id: item.id, name: item.nombre, logo: item.logo });
      return acc;
    }, {});
    setCategories(newCategories);

    const newCategoryIcons = data.reduce((acc, item) => {
      if (!acc[item.categoria]) {
        acc[item.categoria] = item['icono-cat'];
      }
      return acc;
    }, {});
    setCategoryIcons(newCategoryIcons);
  }, []);

  const initialRegion = useMemo(() => ({
    latitude: userLocation ? userLocation.latitude : -12.111161,
    longitude: userLocation ? userLocation.longitude : -76.819539,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }), [userLocation]);

  const closeMenu = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuOpen(false));
  }, [slideAnim]);

  const toggleMenu = useCallback(() => {
    if (menuOpen) {
      closeMenu();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuOpen(true));
    }
  }, [menuOpen, slideAnim, closeMenu]);

  const focusMarker = useCallback((markerId) => {
    const marker = markers.find(m => m.id === markerId);
    if (marker && mapRef.current) {
      mapRef.current.animateToRegion({
        ...marker.coordinate,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
      setSelectedMarker(markerId);
    }
    if (menuOpen) toggleMenu();
  }, [markers, menuOpen, toggleMenu]);

  const handleImagePress = useCallback((item) => {
    focusMarker(item.id);
    openModal(item);
  }, [focusMarker, openModal]);

  

  const filterMarkers = useCallback((category) => {
    setSelectedCategory(prevCategory => {
      const newCategory = prevCategory === category ? null : category;
      if (imageScrollRef.current) {
        imageScrollRef.current.scrollTo({ x: 0, animated: true });
      }
      return newCategory;
    });
  }, []);

  const searchMarkers = useCallback(() => {
    const foundMarker = markers.find(marker => 
      marker.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (foundMarker) {
      setSelectedCategory(null);
      focusMarker(foundMarker.id);
    }
  }, [markers, searchQuery, focusMarker]);

  const handleSearchChange = useCallback((text) => {
    setSearchQuery(text);
    if (text === '') {
      setSelectedMarker(null);
    }
  }, []);

  const togglePanel = useCallback(() => {
    if (isPanelVisible) {
      Animated.spring(panelY, {
        toValue: PANEL_HEIGHT - PANEL_HANDLE_HEIGHT,
        useNativeDriver: true,
      }).start(() => setIsPanelVisible(false));
    } else {
      Animated.spring(panelY, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => setIsPanelVisible(true));
    }
  }, [isPanelVisible, panelY]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        panelY.setValue(Math.max(0, Math.min(PANEL_HEIGHT - PANEL_HANDLE_HEIGHT, PANEL_HEIGHT - PANEL_HANDLE_HEIGHT - gestureState.dy)));
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50 || (gestureState.dy < 0 && gestureState.vy < -0.5)) {
          Animated.spring(panelY, {
            toValue: 0,
            useNativeDriver: true,
          }).start(() => setIsPanelVisible(true));
        } else {
          Animated.spring(panelY, {
            toValue: PANEL_HEIGHT - PANEL_HANDLE_HEIGHT,
            useNativeDriver: true,
          }).start(() => setIsPanelVisible(false));
        }
      },
    })
  ).current;

  const getCategoryIcon = useCallback((category) => {
    return categoryIcons[category] || NotFound;
  }, [categoryIcons]);

  const openInMaps = useCallback((marker) => {
    const url = marker.ruta;
    Linking.openURL(url);
  }, []);

  const extractPhoneNumber = (numero) => {
    // Extraer solo dígitos del número
    return numero.replace(/\D/g, '');
  };

  const openModal = useCallback((item) => {
    setSelectedItem(item);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const filteredMarkers = useMemo(() => 
    markers.filter(marker => 
      marker.coordinate && 
      marker.coordinate.latitude && 
      marker.coordinate.longitude
    ),
    [markers]
  );

  const renderMarker = useCallback(({ id, coordinate }) => (
    <Marker
      key={id}
      coordinate={coordinate}
      onPress={() => focusMarker(id)}
    >
      <View style={[
        styles.markerContainer,
        selectedMarker === id && styles.selectedMarker
      ]} />
    </Marker>
  ), [focusMarker, selectedMarker]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Mi ubicación"
            pinColor="blue"
          />
        )}
        {filteredMarkers.map(renderMarker)}
      </MapView>

      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <MaterialIcons name="menu" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar lugares..."
          onChangeText={handleSearchChange}
          value={searchQuery}
        />
        <TouchableOpacity onPress={searchMarkers}>
          <MaterialIcons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {menuOpen && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.menuOverlay} />
        </TouchableWithoutFeedback>
      )}

      <Animated.View style={[
        styles.menu,
        { transform: [{ translateX: slideAnim }] }
      ]}>
        <Text style={styles.menuTitle}>Mi Aplicación</Text>
        <ScrollView>
          {[
            { icon: 'place', label: 'Mis Lugares' },
            { icon: 'directions', label: 'Mis Rutas' },
            { icon: 'settings', label: 'Ajustes' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <MaterialIcons name={item.icon} size={24} style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.bottomPanel,
          {
            transform: [{ translateY: panelY }],
          }
        ]}
      >
        <TouchableOpacity onPress={togglePanel} style={styles.panelHandle}>
          <View style={styles.panelHandleBar} />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {Object.entries(categories).map(([category, items]) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton
              ]}
              onPress={() => filterMarkers(category)}
            >
              <Image source={{ uri: getCategoryIcon(category) }} style={styles.categoryIcon} />
              {/* <Text style={[styles.categoryButtonText, selectedCategory === category && styles.selectedCategoryButtonText]}>{category}</Text> */}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView 
          ref={imageScrollRef}
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.imageScroll}
        >
          {(selectedCategory ? categories[selectedCategory] : Object.values(categories).flat()).map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleImagePress(item)} style={styles.imageContainer}>
              <Image 
  source={{ uri: item.logo }} 
  style={styles.markerImage} 
  onError={(e) => console.error('Image load error:', e.nativeEvent.error)}
 />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {selectedMarker && (
        <TouchableOpacity 
          style={styles.directionsButton} 
          onPress={() => openInMaps(markers.find(m => m.id === selectedMarker))}
        >
          <MaterialIcons name="directions" size={24} color="#fff" />
          <Text style={styles.directionsButtonText}>Ir</Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {selectedItem && (
                <>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeModal}
                  >
                    <MaterialIcons name="close" size={24} color="#000" />
                  </TouchableOpacity>
                  <Image source={{ uri: markers.find(m => m.id === selectedItem.id)?.image }} style={styles.modalImage} />
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                    <ScrollView style={styles.offersContainer}>
                      {markers.find(m => m.id === selectedItem.id)?.ofertas ? (
                        markers.find(m => m.id === selectedItem.id).ofertas.map((oferta, index) => (
                          <View key={index} style={styles.offerItem}>
                            <MaterialIcons name="local-offer" size={20} color="#007AFF" />
                            <Text style={styles.offerText}>{oferta}</Text>
                          </View>
                        ))
                      ) : (
                        <Text style={styles.modalText}>No hay ofertas disponibles</Text>
                      )}
                    </ScrollView>
                    <View style={styles.contactButtons}>
                      <TouchableOpacity
                        style={styles.contactButton}
                        onPress={() => Linking.openURL(`tel:${markers.find(m => m.id === selectedItem.id)?.numero}`)}
                      >
                        <MaterialIcons name="phone" size={24} color="#25D366" />
                        <Text style={styles.contactButtonText}>Llamar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.contactButton}
                        onPress={() => openInMaps(markers.find(m => m.id === selectedItem.id))}
                      >
                        <MaterialIcons name="directions" size={24} color="#4285F4" />
                        <Text style={styles.contactButtonText}>Cómo llegar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
          </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.5,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 60,
    zIndex: 1000,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 18,
  },
  markerContainer: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  selectedMarker: {
    backgroundColor: 'yellow',
    borderColor: 'red',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  markerText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: PANEL_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 5,
  },
  categoryIcon: {
    width: 60,  // Reducido de 60 a 50
    height: 60, // Reducido de 60 a 50
    marginBottom: 5,
  },
  panelHandle: {
    height: PANEL_HANDLE_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelHandleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#00000030',
    borderRadius: 3,
  },
  categoriesScroll: {
    maxHeight: height * 0.1,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.32,  // Aumentado de 0.2 a 0.22
    height: height * 0.12, // Aumentado de 0.1 a 0.12
  },
  selectedCategoryButton: {
    backgroundColor: 'transparent',  // Remove background color
  },
  categoryButtonText: {
    fontSize: 12,  // Aumentado de 10 a 12
    fontWeight: 'bold',
    marginTop: 3,
    textAlign: 'center',
    flexWrap: 'wrap', // Añadido para permitir que el texto se envuelva
    maxWidth: '100%', // Añadido para asegurar que el texto no se desborde
  },
  selectedCategoryButtonText: {
    color: '#007AFF',  // Change text color instead of background
  },
  searchBar: {
    position: 'absolute',
    top: 40,
    left: 70,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
  },
  imageScroll: {
    maxHeight: height * 0.15,
  },
  imageContainer: {
    paddingHorizontal: 5,
    height: '100%',
    justifyContent: 'center',
  },
  markerImage: {
    width: width * 0.25, // Reducido de 0.3 a 0.25
    height: width * 0.25, // Reducido de 0.3 a 0.25
    borderRadius: 15,
  },
  directionsButton: {
    position: 'absolute',
    bottom: 200,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  directionsButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    width: '90%',
    maxHeight: '80%',
  },
  offersContainer: {
    maxHeight: 150,
    marginBottom: 20,
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  offerText: {
    marginLeft: 10,
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  modalContent: {
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  contactButtonText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Ubicaciones;
