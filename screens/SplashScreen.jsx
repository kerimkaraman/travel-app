import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function SplashScreen({ navigation }) {
  const [anStatus, setAnStatus] = useState(false);
  const anTransform = useSharedValue(-50);
  const anOpacity = useSharedValue(0);

  useEffect(() => {
    if (!anStatus) {
      setTimeout(() => {
        anTransform.value = withSpring(anTransform.value + 50);
        anOpacity.value = withSpring(anOpacity.value + 1);
        setAnStatus(true);
      }, 1000);
    }
  }, []);

  const anStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: anTransform.value }],
      opacity: anOpacity.value,
    };
  });
  return (
    <LinearGradient
      colors={["#30cfd0", "#330867"]}
      style={{ flex: 1, rowGap: 100 }}
    >
      <Text className="mt-32 text-5xl font-semibold text-gray-100 text-center">
        KOMPASSI
      </Text>
      <Animated.View
        style={anStyle}
        className="self-start mx-auto overflow-hidden rounded-full border-4 border-white"
      >
        <Image
          className="w-[200px] h-[200px]"
          source={{
            uri: "https://images.unsplash.com/photo-1515445702422-3a80ccfdb236?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
      </Animated.View>
      <View className="space-y-12 px-12">
        <View>
          <Text className="text-white text-xl">Plan your</Text>
          <Text className="text-white text-xl font-bold">
            Trips & Vacations
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("SignUpScreen")}
          className="bg-[#196EF2] flex-row justify-center items-center gap-x-4 mx-auto px-16 py-4 rounded-full"
        >
          <Text className="text-white text-lg text-center">SHOW ME</Text>
          <AntDesign name="arrowright" size={24} color="white" />
        </Pressable>
      </View>
    </LinearGradient>
  );
}
