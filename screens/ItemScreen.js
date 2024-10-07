import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function ItemScreen({ route }) {
  const navigation = useNavigation();
  const item = route?.params?.param;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="relative bg-white shadow-lg">
          <Image
            source={{ uri: item?.image }}
            className="w-full h-72 object-cover rounded-2xl"
          />

          <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-10 h-10 rounded-md items-center justify-center bg-white"
            >
              <FontAwesome5 name="chevron-left" size={24} color="#06B2BE" />
            </TouchableOpacity>

            <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-[#06B2BE]">
              <FontAwesome5 name="heartbeat" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-[#428288] text-[24px] font-bold">
            {item?.nombre}
          </Text>
          <View className="flex-row items-center space-x-2 mt-2">
            <FontAwesome name="map-marker" size={25} color="#8C9EA6" />
            <Text className="text-[#8C9EA6] text-[20px] font-bold">
              {item?.address}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
              <FontAwesome name="star" size={24} color="#D58574" />
            </View>
            <View>
              <Text className="text-[#515151]">{item?.rating}</Text>
              <Text className="text-[#515151]">Rating</Text>
            </View>
          </View>

          <View className="flex-row items-center space-x-2">
            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
              <FontAwesome name="building" size={24} color="#D58574" />
            </View>
            <View>
              <Text className="text-[#515151]">{item?.category}</Text>
              <Text className="text-[#515151]">Category</Text>
            </View>
          </View>
        </View>

        <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#97A6AF]">
          {item?.description}
        </Text>

        <View className="space-y-2 mt-4 bg-gray-100 rounded-2xl px-4 py-2">
          <View className="items-center flex-row space-x-6">
            <FontAwesome name="phone" size={24} color="#428288" />
            <Text className="text-lg">{item?.phone}</Text>
          </View>
          <View className="items-center flex-row space-x-6">
            <FontAwesome name="map-pin" size={24} color="#428288" />
            <Text className="text-lg">{item?.address}</Text>
          </View>

          <View className="mt-4 px-4 py-4 rounded-lg bg-[#06B2BE] items-center justify-center mb-12">
            <Text className="text-3xl font-semibold uppercase tracking-wider text-gray-100">
              Contact Now
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}