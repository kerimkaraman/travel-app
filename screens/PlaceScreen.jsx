import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import PagerView from "react-native-pager-view";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { FIRESTORE } from "../firebaseConfig";
import { Ionicons, Fontisto, Feather, Entypo } from "@expo/vector-icons";
import LoadingScreen from "./LoadingScreen";
import { Image } from "expo-image";
import PlaceCardScreenSkeleton from "../components/PlaceCardScreenSkeleton";
import { useSelector } from "react-redux";

export default function PlaceScreen({ navigation, route }) {
  const { id } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [isFavorite, setIsFavorite] = useState();
  const [favorites, setFavorites] = useState([]);
  const userId = useSelector((state) => state.user.id);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
      const y = query(collection(db, "users"), where("id", "==", userId));
      const searchSnapshot = await getDocs(y);
      searchSnapshot.forEach((doc) => {
        setFavorites(doc.data().favorites);
      });
      setData(newArr);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = () => {
    if (isFavorite) {
      setIsFavorite(false);
      const db = FIRESTORE;
      const usersCollection = collection(db, "users");
      const userDocument = doc(usersCollection, userId);
      updateDoc(userDocument, {
        favorites: arrayRemove(id),
      })
        .then(() => {
          console.log("Favori başarıyla kaldırıldı");
        })
        .catch((error) => {
          console.error("Favori kaldırılırken bir hata oluştu: ", error);
        });
    } else {
      setIsFavorite(true);
      const db = FIRESTORE;
      const usersCollection = collection(db, "users");
      const userDocument = doc(usersCollection, userId);
      updateDoc(userDocument, {
        favorites: arrayUnion(id),
      })
        .then(() => {
          console.log("Favori başarıyla eklendi");
        })
        .catch((error) => {
          console.error("Favori eklenirken bir hata oluştu: ", error);
        });
    }
  };

  useEffect(() => {
    getData().then(
      setTimeout(() => {
        setIsFavorite(favorites.includes(id));
        setIsLoading(false);
      }, 2000)
    );
  });

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <ScrollView className="bg-white" keyboardDismissMode="none">
      <View style={{ flex: 1, paddingBottom: 50 }}>
        <View className="px-6 mt-16 flex-row items-center justify-between">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <TouchableOpacity
            onPress={handleSave}
            style={{
              borderWidth: 1,
              borderColor: isFavorite ? "red" : "black",
            }}
            className="p-1 items-center justify-center rounded-full"
          >
            <Entypo
              name="heart"
              size={24}
              color={isFavorite ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
        <View className="mt-6 px-4">
          {data.map((place) => {
            return (
              <View key={place.id}>
                <PagerView className="w-full h-[400px]">
                  {place.images.map((image, index) => {
                    return (
                      <Image
                        placeholder={blurhash}
                        transition={1000}
                        onLoad={() => setImageLoaded(false)}
                        key={index}
                        className="rounded-md"
                        source={{ uri: image }}
                      />
                    );
                  })}
                </PagerView>
                {imageLoaded ? (
                  <PlaceCardScreenSkeleton />
                ) : (
                  <View className="mt-6">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center space-x-4">
                        <Text className="text-2xl font-semibold">
                          {place.name}, {place.country}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("MapScreen", { name: place.name })
                        }
                      >
                        <Text className="text-[#186FF1] font-bold text-xs">
                          Show Map
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View className="mt-6">
                      <Text className="leading-5">{place.description}</Text>
                    </View>
                    <View className="mt-6">
                      <Text className="text-xl font-semibold">Facilities</Text>
                      <View className="flex-row space-x-4 justify-center mt-6">
                        <View className="bg-[#EEF2FD] py-4 px-6 rounded-2xl items-center justify-center">
                          <Ionicons
                            name="bus-outline"
                            size={24}
                            color="#B9B9B8"
                          />
                          <Text className="text-[#B9B9B8]">Bus</Text>
                        </View>
                        <View className="bg-[#EEF2FD] py-4 px-6 rounded-2xl items-center justify-center">
                          <Feather
                            name="phone-call"
                            size={24}
                            color="#B9B9B8"
                          />
                          <Text className="text-[#B9B9B8] text-center">
                            Phone
                          </Text>
                        </View>
                        <View className="bg-[#EEF2FD] py-4 px-6 rounded-2xl items-center justify-center">
                          <Ionicons
                            name="fast-food-outline"
                            size={24}
                            color="#B9B9B8"
                          />
                          <Text className="text-[#B9B9B8]">Food</Text>
                        </View>
                        <View className="bg-[#EEF2FD] py-4 px-6 rounded-2xl items-center justify-center">
                          <Fontisto name="hotel" size={24} color="#B9B9B8" />
                          <Text className="text-[#B9B9B8]">Hotel</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
