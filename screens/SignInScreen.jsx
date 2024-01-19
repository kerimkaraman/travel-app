import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword } from "../store/userSlice";

export default function SignInScreen({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const dp = useDispatch();
  const { email, password } = useSelector((state) => state.user);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F2F9FE] pt-24"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="space-y-6 items-center justify-center flex-1">
        <Text className="text-4xl font-semibold">Kompassi</Text>
        <View className="rounded-full overflow-hidden border-4 self-start mx-auto">
          <Image
            className="w-[200px] h-[200px]"
            source={{
              uri: "https://images.unsplash.com/photo-1515445702422-3a80ccfdb236?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          />
        </View>
      </View>
      <LinearGradient
        colors={["#30cfd0", "#330867"]}
        className="p-4 flex-1 rounded-tl-[40px] rounded-tr-[40px]"
      >
        <View className="flex-1">
          <Text className="ml-6 text-white text-2xl font-bold">Sign In</Text>
          <View className="mt-6 space-y-6">
            <TextInput
              onChangeText={(val) => dp(setEmail(val))}
              placeholder="E-Mail"
              placeholderTextColor="#B9B9B8"
              className="bg-[#F2F9FE] w-[90%] mx-auto p-3 rounded-lg text-[#B9B9B8]"
            />
            <View className="bg-[#F2F9FE] w-[90%] mx-auto p-3 rounded-lg flex-row justify-between">
              <TextInput
                onChangeText={(val) => dp(setPassword(val))}
                placeholder="Password"
                placeholderTextColor="#B9B9B8"
                className=" text-[#B9B9B8] w-[90%]"
                secureTextEntry={passwordVisibility}
              />
              <Pressable
                onPress={() => setPasswordVisibility(!passwordVisibility)}
              >
                <Entypo
                  name={passwordVisibility ? "eye" : "eye-with-line"}
                  size={16}
                  color="#B9B9B8"
                />
              </Pressable>
            </View>
            <Pressable className="bg-[#f69f] w-[90%] mx-auto py-2 rounded-lg">
              <Text className="text-white text-lg text-center font-semibold">
                Sign In
              </Text>
            </Pressable>
            <View className="flex-row items-center justify-center gap-x-2">
              <Text className="text-white">Dont have an account?</Text>
              <Pressable onPress={() => navigation.navigate("SignUpScreen")}>
                <Text className="underline font-bold text-white underline-offset-8">
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
