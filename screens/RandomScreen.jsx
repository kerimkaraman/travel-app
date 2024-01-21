import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function RandomScreen() {
  return (
    <View className="items-center justify-center flex-1 space-y-12 bg-white">
      <Text className="text-3xl">Coming soon.</Text>
      <MaterialIcons name="construction" size={100} color="black" />
    </View>
  );
}
