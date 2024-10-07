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

const Card = ({ item, onPress }) => {
  const { categoria, nombre, img, logo, oferta, numero, ruta, descuento, promo } = item;

  // Función para extraer el número de teléfono del enlace de WhatsApp
  const extractPhoneNumber = (whatsappLink) => {
    if (!whatsappLink) return null;
    const match = whatsappLink.match(/(\d+)/);
    return match ? match[0] : null;
  };

  // Función para formatear el número de teléfono
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return 'N/A';
    if (phoneNumber.length === 9) {
      // Formato para celular: 999 999 999
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (phoneNumber.length === 11) {
      // Formato para fijo: (01) 999-9999
      return phoneNumber.replace(/(\d{2})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    return phoneNumber; // Si no coincide con ningún formato conocido, devolver tal cual
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
            {/* <FlatList
              data={oferta}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.offerText}>{item}</Text>
              )}
              ItemSeparatorComponent={() => <View style={styles.offerSeparator} />}
              scrollEnabled={false}
            /> */}
            {/* <Text style={styles.benefitText} numberOfLines={2}>{promo}</Text> */}
            
            <View style={styles.bottomRow}>
              <View style={styles.ratingContainer}>
                <FontAwesome name="whatsapp" solid color="#25D366" size={14} />
                <Text style={styles.ratingText}>{formattedPhoneNumber}</Text>
              </View>
              
              <TouchableOpacity style={styles.locationButton}>
                <FontAwesome name="map-pin" solid color="#4A90E2" size={14} />
                <Text style={styles.locationText}>Ubicación</Text>
              </TouchableOpacity>
              
              <View style={styles.categoryContainer}>
                <FontAwesome name="tag" solid color="#4A90E2" size={12} />
                <Text style={styles.categoryText}>{categoria}</Text>
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
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTop: {
    position: 'relative',
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
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    width:80,
    
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign:'center',
  },
  cardBody: {
    flexDirection: 'row',
    padding: 16,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
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
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
});

export default Card;