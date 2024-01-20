import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FIRESTORE } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import LoadingScreen from "./LoadingScreen";
import { Ionicons, Fontisto, Feather, Entypo } from "@expo/vector-icons";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import PagerView from "react-native-pager-view";
import PlaceCardScreenSkeleton from "../components/PlaceCardScreenSkeleton";
import { Image } from "expo-image";

export default function RandomScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [random, setRandom] = useState(null);
  const [ids, setIds] = useState([]);
  const [id, setId] = useState(null);
  const [dataLength, setDataLength] = useState();
  const [isFavorite, setIsFavorite] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(true);
  const userId = useSelector((state) => state.user.id);
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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

  const getFavorites = async () => {
    try {
      const db = FIRESTORE;
      const y = query(collection(db, "users"), where("id", "==", userId));
      const searchSnapshot = await getDocs(y);
      searchSnapshot.forEach((doc) => {
        setFavorites(doc.data().favorites);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const db = FIRESTORE;
      const querySnapshot = await getDocs(collection(db, "places"));
      const newArr = querySnapshot.docs.map((doc) => {
        setIds((previous) => [...previous, doc.data().id]);
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setData(newArr);
      setDataLength(newArr.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setRandom(null);
    setId(null);
    setIsFavorite(null);
    getFavorites()
      .then(getData())
      .then(
        setTimeout(() => {
          setRandom(Math.floor(Math.random() * dataLength));
          setId(ids[random]);
        }, 2000)
      )
      .then(
        setTimeout(() => {
          setIsFavorite(favorites.includes(id));
        }, 4000)
      )
      .then(
        setTimeout(() => {
          setIsLoading(false);
        }, 6000)
      );
  }, [isFocused]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    data
      .filter((place) => place.id == id)
      .map((place) => {
        return (
          <ScrollView
            key={place.id}
            className="flex-1 bg-white"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            <View className="mt-16 px-6 justify-end">
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  borderWidth: 1,
                  borderColor: isFavorite ? "red" : "black",
                }}
                className="p-1 items-center justify-center rounded-full self-end"
              >
                <Entypo
                  name="heart"
                  size={24}
                  color={isFavorite ? "red" : "black"}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-1 px-4 mt-4">
              <View className="flex-1">
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
            </View>
          </ScrollView>
        );
      })
  );
}
