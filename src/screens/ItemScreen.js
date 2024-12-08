import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Linking,
  Platform,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const ItemScreen = ({ route }) => {
  const navigation = useNavigation();
  const item = route?.params?.param;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Extraer y formatear el número de teléfono
  const extractPhoneNumber = (whatsappLink) => {
    if (!whatsappLink) return null;
    const match = whatsappLink.match(/(\d+)/);
    return match ? match[0] : null;
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "N/A";
    const cleanNumber = phoneNumber.slice(-9);
    return cleanNumber.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
  };

  const phoneNumber = extractPhoneNumber(item?.numero);
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  // Funciones para manejar las acciones de contacto
  const handleCall = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert('Error', 'La llamada telefónica no está soportada en este dispositivo');
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch(err => console.error('Error al intentar llamar:', err));
  };

  const handleWhatsApp = () => {
    const whatsappUrl = Platform.select({
      ios: `whatsapp://send?phone=${phoneNumber}`,
      android: `whatsapp://send?phone=${phoneNumber}`
    });
    
    Linking.canOpenURL(whatsappUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert('Error', 'WhatsApp no está instalado en este dispositivo');
        } else {
          return Linking.openURL(whatsappUrl);
        }
      })
      .catch(err => console.error('Error al abrir WhatsApp:', err));
  };

  const renderOfferItem = (offer, index) => (
    <View key={index} style={styles.offerItem}>
      <View style={styles.bullet} />
      <Text style={styles.offerText}>{offer}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Image Section */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: item?.img }}
            style={styles.headerImage}
          />
          
          {/* Navigation Button */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <FontAwesome5 name="chevron-left" size={24} color="#06B2BE" />
            </TouchableOpacity>
          </View>

          {/* Discount Badge */}
          {item?.descuento && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.descuento}</Text>
            </View>
          )}
        </View>

        {/* Business Info Section */}
        <View style={styles.infoContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: item?.logo }}
              style={styles.logo}
            />
          </View>

          {/* Main Info */}
          <View style={styles.mainInfo}>
            <Text style={styles.businessName}>{item?.nombre}</Text>
            <Text style={styles.categoryText}>{item?.categoria}</Text>

            {/* Offer Details */}
            {item?.oferta && item.oferta.length > 0 && (
          <View style={styles.offerContainer}>
            <Text style={styles.offerTitle}>Ofertas</Text>
            <View style={styles.offersList}>
              {item.oferta.map((offer, index) => renderOfferItem(offer, index))}
            </View>
          </View>
        )}

            {/* Promo Details */}
            {/* {item?.promo && (
              <View style={styles.promoContainer}>
                <Text style={styles.promoTitle}>Promoción</Text>
                <Text style={styles.promoText}>{item.promo}</Text>
              </View>
            )} */}

            {/* Contact Information */}
            <View style={styles.contactContainer}>
              {/* Phone */}
              {/* <TouchableOpacity 
                style={styles.contactItem}
                onPress={handleWhatsApp}
              >
                <View style={styles.contactIconContainer}>
                  <FontAwesome name="whatsapp" size={20} color="#25D366" />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={styles.contactLabel}>WhatsApp</Text>
                  <Text style={styles.contactInfo}>{formattedPhoneNumber}</Text>
                </View>
              </TouchableOpacity> */}

              {/* Location */}
              <TouchableOpacity style={styles.contactItem}>
                <View style={[styles.contactIconContainer, styles.locationIcon]}>
                  <FontAwesome5 name="map-marker-alt" size={20} color="#124076" />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={styles.contactLabel}>Dirección</Text>
                  <Text style={styles.contactInfo}>{item?.ruta}</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.callButton]}
                onPress={handleCall}
              >
                <Text style={styles.actionButtonText}>Llamar Ahora</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.whatsappButton]}
                onPress={handleWhatsApp}
              >
                <Text style={styles.actionButtonText}>WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  navigationContainer: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  discountBadge: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 44 : 24,
    right: 24,
    backgroundColor: "#fc800c",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  discountText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: "white",
    marginTop: -40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  logoContainer: {
    position: "absolute",
    top: -40,
    left: 24,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  mainInfo: {
    marginTop: 40,
  },
  businessName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  categoryText: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  offerContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#EBF5FF",
    borderRadius: 12,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D4ED8",
    marginBottom: 8,
  },
  offersList: {
    gap: 8,
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
    marginTop: 4,
  },
  offerText: {
    flex: 1,
    color: "#3B82F6",
    fontSize: 14,
    lineHeight: 20,
  },
  promoContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#047857",
  },
  promoText: {
    marginTop: 4,
    color: "#059669",
  },
  contactContainer: {
    marginTop: 24,
    gap: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 12,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  locationIcon: {
    backgroundColor: "#EBF5FF",
  },
  contactTextContainer: {
    marginLeft: 16,
  },
  contactLabel: {
    fontSize: 14,
    color: "#666",
  },
  contactInfo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  callButton: {
    backgroundColor: "#2563EB",
  },
  whatsappButton: {
    backgroundColor: "#25D366",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ItemScreen;