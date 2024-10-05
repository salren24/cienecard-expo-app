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
            <FlatList
              data={oferta}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.offerText}>{item}</Text>
              )}
              ItemSeparatorComponent={() => <View style={styles.offerSeparator} />}
              scrollEnabled={false}
            />
            <Text style={styles.benefitText} numberOfLines={2}>{promo}</Text>
            
            <View style={styles.bottomRow}>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" solid color="#fc800c" size={12} />
                <Text style={styles.ratingText}>{numero}</Text>
              </View>
              
              <TouchableOpacity style={styles.locationButton}>
                <FontAwesome name="map-pin" solid color="#fc800c" size={12} />
                <Text style={styles.locationText}>Ubicación</Text>
              </TouchableOpacity>
              
              <View style={styles.categoryContainer}>
                <FontAwesome name="circle" solid color="#474747" size={4} />
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
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTop: {
    position: 'relative',
  },
  cardImg: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardBody: {
    flexDirection: 'row',
    padding: 15,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#f0f0f0',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#232425',
    marginBottom: 5,
  },
  offerText: {
    fontSize: 14,
    color: '#fc800c',
    marginBottom: 5,
  },
  benefitText: {
    fontSize: 14,
    color: '#474747',
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#232425',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#474747',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#474747',
  },
  offerText: {
    fontSize: 14,
    color: '#fc800c',
  },
  offerSeparator: {
    height: 4,
  },
});

export default Card;