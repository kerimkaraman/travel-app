import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE } from "../firebaseConfig";
import LoadingScreen from "./LoadingScreen";
import ProfilePlaceCard from "../components/ProfilePlaceCard";
import { useIsFocused } from "@react-navigation/native";

export default function ProfileScreen() {
  const { id, namesurname, email } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  const getData = async () => {
    const db = FIRESTORE;
    const querySnapshot = await getDocs(collection(db, "places"));
    const newArr = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setPlaces(newArr);
  };

  async function getFavorites() {
    try {
      const db = FIRESTORE;
      const y = query(collection(db, "users"), where("id", "==", id));
      const searchSnapshot = await getDocs(y);
      searchSnapshot.forEach((doc) => {
        setFavorites(doc.data().favorites);
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getFavorites()
      .then(() => getData())
      .then(
        setTimeout(() => {
          setIsLoading(false);
        }, 2000)
      );
  }, [isFocused]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View className="bg-white flex-1">
      <View className="border-b border-gray-300 items-center justify-center flex-col gap-y-4 pb-4 mt-16">
        <View className="self-start border-2 rounded-full overflow-hidden mx-auto">
          <Image
            style={{ objectFit: "contain" }}
            source={{
              uri: "https://images.unsplash.com/photo-1529420705456-5c7e04dd043d?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="w-[100px] h-[100px]"
          />
        </View>
        <View className="flex-col gap-y-2">
          <Text className="text-center text-lg font-semibold">
            {namesurname}
          </Text>
          <Text className="text-center text-xs text-gray-500">{email}</Text>
        </View>
        <View>
          <Text>No description.</Text>
        </View>
      </View>
      <View className="flex-1">
        <Text className="text-2xl font-semibold p-2">Favorites</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            gap: 20,
            paddingVertical: 20,
          }}
        >
          {places
            .filter((place) => favorites.includes(place.id))
            .map((place) => {
              return (
                <ProfilePlaceCard
                  id={place.id}
                  key={place.id}
                  name={place.name}
                  thumbnail={place.thumbnail}
                  description={place.description}
                  rating={place.rating}
                />
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}
