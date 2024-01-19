import { View, Text, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function SearchItem({ id, thumbnail, name, country, rating }) {
  const nav = useNavigation();
  return (
    <Animated.View
      className=" bg-[#F2F9FE] p-4 my-2 rounded-xl"
      entering={FadeInLeft}
    >
      <Pressable
        className="flex-row items-end justify-start space-x-8"
        onPress={() => nav.navigate("PlaceScreen", { id: id })}
      >
        <Image
          className="w-[50px] h-[50px] rounded-lg"
          source={{ uri: thumbnail }}
        />
        <View className="items-start justify-start">
          <Text className="text-lg font-semibold">{name}</Text>
          <Text className="text-xs text-[#B9B9B8]">{country}</Text>
        </View>
        <View className="flex-row items-center gap-x-2">
          <AntDesign name="star" size={24} color="yellow" />
          <Text className="font-bold">{rating}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
