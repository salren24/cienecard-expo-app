import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useLayoutEffect, useState } from "react";
  import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
  import { useNavigation } from "@react-navigation/native";
  import { Avatar, NotFound, logo, gastronomia, mascotas, jardineria,salud,tecnologia, automotriz, lavanderia, viajes, gimnasio, belleza } from "../assets";
  import MenuContainer from "../components/MenuContainer";
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  
  import { FontAwesome } from "@expo/vector-icons";
  import ItemCarDontainer from "../components/ItemCarDontainer_";
  import { getPlacesData } from "../api";
  import { StatusBar } from "expo-status-bar";
  
  
  export default function Municipales () {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
  
    const [type, setType] = useState("restaurants");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    useEffect(() => {
      setIsLoading(true);
      getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
        setMainData(data);
        setInterval(() => {
          setIsLoading(false);
        }, 2000);
      });
    }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);
  
    return (
      
      <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: '#ffffff'}}>
         <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    width: '100%'
  
  }}>
          <View style={{width: '70%', height: '100%'}}>
          <Image source={logo} style={{width: 200, height: 40}}></Image>
          </View>
  
          <View style={{
    width: 48, // w-12
    height: 48, // h-12
    backgroundColor: '#gray400', // bg-gray-400
    borderRadius: 8, // rounded-md
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // shadow-lg
  }}>
    <Image
      source={Avatar}
      style={{
        width: '100%', // w-full
        height: '100%', // h-full
        borderRadius: 8, // rounded-md
        resizeMode: 'cover' // object-cover
      }}
    />
  </View>
        </View>
  
        <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16, // mx-4
    borderRadius: 24, // rounded-xl
    paddingVertical: 4, // py-1
    paddingHorizontal: 16, // px-4
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // shadow-lg
    marginTop: 16, // mt-4
    marginBottom:16,
  }}>
    <GooglePlacesAutocomplete
      GooglePlacesDetailsQuery={{ fields: "geometry" }}
      placeholder="Search"
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(details?.geometry?.viewport);
        setBl_lat(details?.geometry?.viewport?.southwest?.lat);
        setBl_lng(details?.geometry?.viewport?.southwest?.lng);
        setTr_lat(details?.geometry?.viewport?.northeast?.lat);
        setTr_lng(details?.geometry?.viewport?.northeast?.lng);
      }}
      query={{
        key: "3deb0a07ddmshadfd9cff2ce93a1p1dfc59jsnf80db7075fc1",
        language: "en",
      }}
    />
  </View>
  
        {/* Menu Container */}
        {isLoading ? (
          <View className=" flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0B646B" />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20 }}>
        <MenuContainer
          key="gastronomia"
          title="Gastronomía"
          imageSrc={gastronomia}
          type={type}
          setType={setType}
        />
  
        <MenuContainer
          key="jardinería"
          title="Jardinería"
          imageSrc={jardineria}
          type={type}
          setType={setType}
        />
  
        <MenuContainer
          key="mascotas"
          title="Mascotas"
          imageSrc={mascotas}
          type={type}
          setType={setType}
        />
  
  <MenuContainer
          key="tecnologia"
          title="Tecnología"
          imageSrc={tecnologia}
          type={type}
          setType={setType}
        />
  
  <MenuContainer
          key="salud"
          title="Salud"
          imageSrc={salud}
          type={type}
          setType={setType}
        />
  
  <MenuContainer
          key="belleza"
          title="Belleza"
          imageSrc={belleza}
          type={type}
          setType={setType}
        />
  
  <MenuContainer
          key="gimnasio"
          title="Gimnasios"
          imageSrc={gimnasio}
          type={type}
          setType={setType}
        />
  
  <MenuContainer
          key="viajes"
          title="Viajes"
          imageSrc={viajes}
          type={type}
          setType={setType}
        />
  
  <MenuContainer
          key="automotriz"
          title="Automotriz"
          imageSrc={automotriz}
          type={type}
          setType={setType}
        />
  
  <MenuContainer
          key="lavanderia"
          title="Lavanderías"
          imageSrc={lavanderia}
          type={type}
          setType={setType}
        />
  
            </View>
  
              </ScrollView>
           
            <View>
              <View className="flex-row items-center justify-between px-4 mt-8">
                <Text className="text-[#2C7379] text-[28px] font-bold">
                  Top Tips
                </Text>
                {/* <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                  
                </TouchableOpacity> */}
              </View>
  
              <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
                {mainData?.length > 0 ? (
                  <>
                    {mainData?.map((data, i) => (
                       <ItemCarDontainer
                         key={i}
                        imageSrc={
                           data?.photo?.images?.medium?.url
                            ? data?.photo?.images?.medium?.url
                             : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                         }
                        title={data?.name}
                         location={data?.location_string}
                       data={data}
                      />
                      
                    ))}
                  </>
                ) : (
                  <>
                    <View className="w-full h-[400px] items-center space-y-8 justify-center">
                      <Image
                        source={NotFound}
                        className=" w-32 h-32 object-cover"
                      />
                      <Text className="text-2xl text-[#428288] font-semibold">
                        Opps...No Data Found
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
     
    );
  };
  