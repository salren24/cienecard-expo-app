import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const MenuContainer = ({ title, imageSrc, type, setType }) => {
  const handlePress = () => {
    setType(title.toLowerCase());
  };
  return (
    <TouchableOpacity onPress={handlePress} style={{width:120, height: 130, justifyContent: 'center',
      alignItems: 'center',}}>
      <View
        style={{
          width: 100,
          height: 100,
          padding: 2,
          borderRadius: 24,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          backgroundColor: type === title.toLowerCase() ? '#E5E5EA' : '#FFFFFF',
        }}
      >
      <Image source={imageSrc} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
      </View>
      <Text style={{width:120, color: '#474747', fontSize: 16                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  , textAlign:'center' }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuContainer;
