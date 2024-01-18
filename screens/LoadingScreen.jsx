import { View, Text, Image } from "react-native";
import React from "react";

export default function LoadingScreen() {
  return (
    <View className="flex-1 bg-white">
      <Image
        className="w-[300px] h-[400px]"
        source={require("../assets/svg/trip.gif")}
      />
    </View>
  );
}
