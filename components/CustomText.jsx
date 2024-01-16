import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";

export default function CustomText({ children, textClassName, bold }) {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <Text>Loading....</Text>;
  } else
    return (
      <Text
        style={{
          fontFamily: bold == true ? "Inter_800ExtraBold" : "Inter_400Regular",
        }}
        className={textClassName}
      >
        {children}
      </Text>
    );
}
