import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ItemCarDontainer = ({ imageSrc, title, location, data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ItemScreen", { param: data })}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
      <Image
        source={{ uri: imageSrc }}
        className="w-full h-40 rounded-md object-cover"
      />
      </View>
 
      {title ? (
        <>
          <Text  style={styles.description}>
            {title?.length > 14 ? `${title.slice(0, 14)}..` : title}
          </Text>

          <View className="flex-row items-center space-x-1">
            <FontAwesome name="map-marker" size={20} color="#8597A2" />
            <Text className="text-[#428288] text-[14px] font-bold">
              {location?.length > 18 ? `${title.slice(0, 18)}..` : location}
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}

      
      
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20
    
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
  },
  favorite: {
    marginLeft: 10,
  },
  superhost: {
    backgroundColor: '#ccc',
    padding: 5,
    borderRadius: 5,
  },
  superhostText: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ItemCarDontainer;
