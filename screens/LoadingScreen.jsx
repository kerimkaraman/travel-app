import { View, Text, Image } from "react-native";
import React from "react";

export default function LoadingScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Image
        className="w-[300px] h-[400px]"
        style={{ objectFit: "contain" }}
        source={require("../assets/svg/trip.gif")}
      />
    </View>
  );
}
