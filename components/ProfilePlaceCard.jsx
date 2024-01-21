import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function ProfilePlaceCard({
  id,
  thumbnail,
  description,
  name,
  rating,
}) {
  const nav = useNavigation();
  return (
    <Animated.View entering={FadeInLeft}>
      <Pressable
        onPress={() => nav.navigate("PlaceScreen", { id: id })}
        className="flex-row bg-[#F2F9FE] items-center space-x-3 p-4 mx-4 rounded-xl"
      >
        <Image
          className="h-[100px] w-[100px] rounded-lg"
          source={{ uri: thumbnail }}
        />
        <View className="w-[50%] flex-col gap-y-2">
          <Text className="text-xl font-semibold">{name}</Text>
          <Text className="text-xs">{description.slice(0, 70)}...</Text>
        </View>
        <View className="flex-row items-center justify-center">
          <Entypo name="star" size={24} color="orange" />
          <Text className="font-semibold">{rating.toString()}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
