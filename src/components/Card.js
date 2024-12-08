import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Text,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const Card = ({ item, onPress, userLocation }) => {
  const { categoria, nombre, img, logo, oferta, numero, ruta, descuento, promo, coordenadas } = item;

  // Función para calcular la distancia
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distancia en km
    return d.toFixed(2); // Redondear a 2 decimales
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

   // Calcular la distancia si tenemos la ubicación del usuario y las coordenadas del comercio
   const distance = userLocation && coordenadas
   ? calculateDistance(
       userLocation.latitude,
       userLocation.longitude,
       coordenadas.latitud,
       coordenadas.longitud
     )
   : null;

  // Función para extraer el número de teléfono del enlace de WhatsApp
  const extractPhoneNumber = (whatsappLink) => {
    if (!whatsappLink) return null;
    const match = whatsappLink.match(/(\d+)/);
    return match ? match[0] : null;
  };

  // Función para formatear el número de teléfono
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return 'N/A';
    // Eliminar cualquier prefijo (asumiendo que los prefijos son los primeros 2 dígitos para fijos o nada para celulares)
    const cleanNumber = phoneNumber.slice(-9);
    // Formato: 999 999 999
    return cleanNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
  };

  const phoneNumber = extractPhoneNumber(numero);
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Image
            alt=""
            resizeMode="cover"
            style={styles.cardImg}
            source={{ uri: img }}
          />
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{descuento}</Text>
          </View>
        </View>
        
        <View style={styles.cardBody}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: logo }} style={styles.logo} />
            
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.cardTitle} numberOfLines={1}>{nombre}</Text>
            <Text style={styles.categoryText}>{categoria}</Text>
            <View style={styles.bottomRow}>
              <View style={styles.infoColumn}>
                <View style={styles.infoItem}>
                  <FontAwesome name="map-marker-alt" solid color="#124076" size={16} />
                  <Text style={styles.infoText}>
                    {distance ? `${distance} km` : 'Ubicación'}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <FontAwesome name="whatsapp" solid color="#25D366" size={16} />
                  <Text style={styles.infoText}>{formattedPhoneNumber}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fc800c',
    // borderWidth: 2,
    // borderColor: '#124076',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    width:85,
    
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign:'center',
  },
  cardBody: {
    flexDirection: 'row',
    padding: 10,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10
    },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    
  },
  
  infoContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 0,
  },
  offerText: {
    fontSize: 15,
    color: '#4A90E2',
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  // bottomRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  locationText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#4A90E2',
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
  },
  offerSeparator: {
    height: 4,
  },
  bottomRow: {
    marginTop: 2,
  },
  infoColumn: {
    // TODO: Ajustar el espaciado vertical entre elementos si es necesario
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 0, // Espacio entre elementos
  },
  infoText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#333',
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#83899E',
  },
});

export default Card;