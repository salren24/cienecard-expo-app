import React, { useCallback, useEffect, useLayoutEffect, useState  } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Card from "../components/Card"

import comercialesData from '../data/datos.json';




export default function Example() {
  const [saved, setSaved] = useState([]);
  const [mainData, setMainData] = useState([]);
  const navigation = useNavigation();

  const handleSave = useCallback(
    id => {
      if (saved.includes(id)) {
        // remove listing id from the `saved` array
        setSaved(saved.filter(val => val !== id));
      } else {
        // add listing id to the `saved` array
        setSaved([...saved, id]);
      }
    },
    [saved],
  );

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ItemScreen", { param: data })}
      style={styles.container}
    >
     <ScrollView contentContainerStyle={styles.content}>
  {comercialesData.map((item) => (
    <Card
      key={item.id}
      item={item}
      onPress={() => navigation.navigate("ItemScreen", { param: item })}
    />
  ))}
</ScrollView>
      </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  /** Card */
  card: {
    position: 'relative',
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 30,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: '2%',
    left: 12,
    width:'50',
    backgroundColor: '#000',
    
  },
  cardLike: {
    width: '100%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLike: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fc800c',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardBody: {
    flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#232425',
    marginRight: 'auto',
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 4,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#232425',
  },
  cardDates: {
    marginTop: 4,
    marginLeft: 2,
    fontSize: 14,
    color: '#595a63',
  },
  cardPrice: {
    marginLeft: 4,
    fontSize: 13,
    color: '#474747',
  },
  
  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: "center",
  },
  leftContainer: {
    width: '30%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
  },
  
  rightContainer: {
    flex: 1,
    width: '70%',
    height:115,
    
  },
  startWrapper: {
    top:5,
    width: 45,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    
  },
  mapWrapper: {
    top:5,
    width: 90,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    
  },
  categoryWrapper: {
    top:5,
    width: 100,
    height: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    
  },
});