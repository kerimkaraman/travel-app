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
import { doc, setDoc } from "firebase/firestore";
import { AUTH, FIRESTORE } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { v4 as uuid } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import {
  setEmail,
  setId,
  setNameSurname,
  setPassword,
} from "../store/userSlice";

export default function SignUpScreen({ navigation }) {
  const { email, namesurname, password } = useSelector((state) => state.user);
  const dp = useDispatch();
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const handleSignup = async () => {
    const id = uuid();
    const db = FIRESTORE;
    const auth = AUTH;

    await setDoc(doc(db, "users", id), {
      id: id,
      namesurname: namesurname,
      email: email,
      password: password,
      favorites: [],
    });

    dp(setId(id));

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("BottomTabs");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F2F9FE] pt-16"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="space-y-4 items-center justify-center flex-1">
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
        className="flex-1 p-4 rounded-tl-[40px] rounded-tr-[40px]"
      >
        <View className="flex-1">
          <Text className="ml-6 text-white text-2xl font-bold">Sign Up</Text>
          <View className="mt-4 space-y-6">
            <TextInput
              onChangeText={(val) => dp(setNameSurname(val))}
              placeholder="Name Surname"
              placeholderTextColor="#B9B9B8"
              className="bg-[#F2F9FE] w-[90%] mx-auto p-3 rounded-lg text-[#B9B9B8]"
            />
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
            <Pressable
              onPress={handleSignup}
              className="bg-[#f69f] w-[90%] mx-auto py-2 rounded-lg"
            >
              <Text className="text-white text-lg text-center font-semibold">
                Sign Up
              </Text>
            </Pressable>
            <View className="flex-row items-center justify-center gap-x-2">
              <Text className="text-white">Already have an account?</Text>
              <Pressable onPress={() => navigation.navigate("SignInScreen")}>
                <Text className="underline font-bold text-white underline-offset-8">
                  Log In
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
