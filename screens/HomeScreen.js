import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Pressable,
  } from "react-native";
  import React, { useLayoutEffect, useState } from "react";
  import * as Animatable from "react-native-animatable";
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import { useNavigation } from "@react-navigation/native";
  import { Ionicons } from "@expo/vector-icons";
  import HamburgerMenu from "../components/HamburgerMenu";
  import { Avatar } from "../assets";
  import {  fondo,ciene,municipal,comercio,ubicacion } from "../assets/index";
  import { useHeaderHeight } from "@react-navigation/elements";
  
  import Colors from "../constants/Colors";
  

 import CircleMenu from "../components/CircleMenu";


  export default function HomeScreen () {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [menuVisible, setMenuVisible] = useState(false);
    const [opened, setOpened] = useState(false);
    
    const headerHeight = useHeaderHeight();
    const [category, setCategory] = useState("All");
  
    const menuItems = [
      { id: 1, label: 'Home', icon: '🏠' },
      { id: 2, label: 'Search', icon: '🔍' },
      { id: 3, label: 'Profile', icon: '👤' },
      { id: 4, label: 'Settings', icon: '⚙️' },
      { id: 5, label: 'Logout', icon: '🚪' },
    ];

    useLayoutEffect(() => {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: "",
        headerRight: () => (
          <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
            <Image
              source={{
                uri: "https://xsgames.co/randomusers/avatar.php?g=female",
              }}
              style={{ width: 40, height: 40, borderRadius: 10, top: 10}}
            />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          !menuVisible && (
            <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ marginLeft: 20 }}>
              <Ionicons name="menu" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          )
        ),
      });
    }, [navigation, menuVisible]);

  return (
    <View style={{paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: '#000000'}}>
       <HamburgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      {/* First Section */}

      <Image
        source={fondo}
        style={{
          position: "absolute",
          top:80,
          left: -170,
          transform: [{ rotate: "22.01deg" }],
          width: 455,
          height: 435,
          justifyContent: 'center'
        }}
      />
      <View style={{ paddingHorizontal: 24, marginTop: 32, alignItems: 'flex-end', position: 'relative', top: 40 }}>
         <Text style={{ color: '#FFFFFF', fontSize: 28 }}> ID: 10165189113 </Text>
         <Text style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 'bold' }}> FREDY </Text>
       </View>
        <View style={{ position: 'absolute', right: 0, top: '25%', width: '50%', height: '50%'}}>
        
        <CircleMenu menuItems={menuItems} />


        
        </View>
      

      
        {/* Circle Section */}
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={ciene}
          style={{ width: 133, height: 213, position: 'absolute', bottom: 0, left: 0 }} // Cambiado a estilo compatible
        />
        {/* <View className="w-[400px] h-[400px] bg-[#00BCC9] rounded-full absolute bottom-36 -right-36"></View>
       <View className="w-[400px] h-[400px] bg-[#E99265] rounded-full absolute -bottom-28 -left-36"></View> */}
  
  {/* Image container */}
  {/* <View style={{ flex: 1, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      
  <TouchableOpacity
         onPress={() => navigation.navigate("Comerciales")}
         style={{
           position: 'absolute',
           bottom: 20,
           width: 96, // w-24 in Tailwind
           height: 96, // h-24 in Tailwind
           borderLeftWidth: 2,
           borderRightWidth: 2,
           borderTopWidth: 4,
           borderColor: '#00BCC9',
           borderRadius: 48, // rounded-full in Tailwind
           alignItems: 'center',
           justifyContent: 'center',
         }}
       >
         <Animatable.View
         style={{
          width: 80, // Ajusta el tamaño según sea necesario
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00BCC9',
          borderRadius: 40,
          position: 'absolute',
          bottom: 0,
        }}
           animation="pulse"
           easing="ease-in-out"
           iterationCount="infinite"
           
         >
           <Text style={{ color: '#FFFFFF', fontSize: 36, fontWeight: '600' }}>Go</Text>
         </Animatable.View>
       </TouchableOpacity>
     </View> */}



    </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000', // Cambiado de Colors.bgColor a 'black'
    },
    fondo: {
    position: "absolute",
    top: 80,
    left: 0,
    transform: [{ rotate: "-16.38deg" }],
  },
  logo: {
    
        bottom: 40,
        left: 0,
        width: 300,
        height: 300,
        resizeMode: "cover",
    
  },
  codigo: {
    color: "#fff",
    position: "absolute",
    top: 120,
    right: 20,
    fontSize: 26,
  },
  nombre:{
    color: "#fff",
    position: "absolute",
    top: 150,
    right: 20,
    fontSize: 36,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
  },
  headingTxt: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
    marginTop: 10,
  },
  searchSectionWrapper: {
    flexDirection: "row",
    marginVertical: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
  },
  filterBtn: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    borderRadius: 10,
    marginLeft: 20,
  },

});

