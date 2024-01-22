import { View, TextInput, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FIRESTORE } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import SearchItem from "../components/SearchItem";
import LoadingScreen from "./LoadingScreen";

export default function SearchScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

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
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View className="flex-1 bg-white pt-16">
      <View className="items-center justify-center px-4 flex-row">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>
        <View className="bg-[#F2F9FE] flex-row items-center justify-start w-[80%] mx-auto px-4 space-x-4 py-2 rounded-full">
          <Ionicons name="search" size={20} color="#B9B9B8" />
          <TextInput
            onChangeText={(val) => setFilterText(val)}
            autoFocus={true}
            placeholder="Find places to go"
          />
        </View>
      </View>
      <ScrollView className="flex-1 px-4 mt-6">
        <View className="flex-1">
          {filterText != "" &&
            data
              .filter((place) => place.name.includes(filterText))
              .map((place) => {
                return (
                  <SearchItem
                    key={place.id}
                    thumbnail={place.thumbnail}
                    name={place.name}
                    id={place.id}
                    country={place.country}
                    rating={place.rating}
                  />
                );
              })}
        </View>
      </ScrollView>
    </View>
  );
}
