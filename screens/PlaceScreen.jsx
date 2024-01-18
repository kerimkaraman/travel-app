import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import PagerView from "react-native-pager-view";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import PlaceCardImageSkeleton from "../components/PlaceCardImageSkeleton";

export default function PlaceScreen({ navigation, route }) {
  const { id } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(true);

  const getData = async () => {
    try {
      const db = FIRESTORE;
      const q = query(collection(db, "places"), where("id", "==", id));

      const querySnapshot = await getDocs(q);
      const newArr = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setData(newArr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData().then(setIsLoading(false));
  });

  return isLoading ? null : (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      className=" bg-white pt-16"
    >
      <View className="px-6">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      </View>
      <View className="mt-6 px-4">
        {data.map((place) => {
          return (
            <View key={place.id}>
              {imageLoaded && (
                <View>
                  <PlaceCardImageSkeleton />
                </View>
              )}
              <PagerView className="w-full h-[400px]">
                {place.images.map((image, index) => {
                  return (
                    <Image
                      onLoad={() => setImageLoaded(false)}
                      key={index}
                      className="rounded-md"
                      source={{ uri: image }}
                    />
                  );
                })}
              </PagerView>
              <View className="mt-6">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center space-x-4">
                    <Text className="text-2xl font-semibold">
                      {place.name}, {place.country}
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Text className="text-[#186FF1] font-bold text-xs">
                      Show Map
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="mt-6">
                  <Text>{place.description}</Text>
                </View>
                <View>
                  <Text className="text-xl">Facilities</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
