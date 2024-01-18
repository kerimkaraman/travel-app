import { View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function SearchScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const db = FIRESTORE;
    const querySnapshot = await getDocs(collection(db, "places"));
    const newData = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setData(newData);
  };
  useEffect(() => {
    getData().then(
      setTimeout(() => {
        setIsLoading(false);
      }, 1000)
    );
  }, []);
  return isLoading ? null : (
    <View className="flex-1 bg-white pt-16">
      <View className="items-center justify-center px-4 flex-row">
        <Pressable>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>
        <View className="bg-[#F2F9FE] flex-row items-center justify-start w-[80%] mx-auto px-4 space-x-4 py-2 rounded-full">
          <Ionicons name="search" size={20} color="#B9B9B8" />
          <TextInput autoFocus={true} placeholder="Find places to go" />
        </View>
      </View>
    </View>
  );
}
