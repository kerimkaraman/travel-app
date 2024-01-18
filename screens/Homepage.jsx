import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RegionItem from "../components/RegionItem";
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../firebaseConfig";
import PlaceCard from "../components/PlaceCard";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen";

export default function Homepage() {
  const width = Dimensions.get("screen").width;
  const regions = [
    "All",
    "Europe",
    "North America",
    "Middle America",
    "South America",
    "Asia",
    "Africa",
    "Australia",
    "Antarctica",
  ];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchControl, setFetchControl] = useState(true);
  const { clickedRegion } = useSelector((state) => state.regionStyle);

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

  const filterData = useMemo(() => {
    if (clickedRegion == "All") {
      setFetchControl(false);
      return data;
    } else {
      setFetchControl(false);
      if (data.filter((place) => place.region == clickedRegion) != null) {
        return data.filter((place) => place.region == clickedRegion);
      } else {
        return <Text>Nothing found</Text>;
      }
    }
  }, [data, clickedRegion]);

  useEffect(() => {
    getData()
      .then(setData(filterData))
      .then(() => setIsLoading(false));

    console.log(width / 2);
  }, []);

  return fetchControl == null || undefined ? (
    <LoadingScreen />
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="pt-16 flex-1 bg-white"
    >
      <View>
        <Text
          style={{
            textShadowColor: "rgba(0, 0, 0, 0.2)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10,
          }}
          className="text-2xl px-6"
        >
          Kompassi
        </Text>
      </View>
      <Pressable className="bg-[#F2F9FE] flex-row items-center justify-start w-[90%] mx-auto mt-6 px-4 space-x-4 py-2 rounded-full">
        <Ionicons name="search" size={20} color="#B9B9B8" />
        <Text className="text-lg text-[#B9B9B8]">Find places to go</Text>
      </Pressable>
      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-6"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {regions.map((region, index) => {
            return <RegionItem key={index} data={region} id={index} />;
          })}
        </ScrollView>
      </View>
      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 100,
            flex: 1,
          }}
          className="mt-12 px-5 flex-1"
        >
          {filterData != [] ? (
            filterData.map((place) => {
              return (
                <PlaceCard
                  key={place.id}
                  id={place.id}
                  name={place.name}
                  thumbnail={place.thumbnail}
                  rating={place.rating}
                />
              );
            })
          ) : (
            <Text className="text-4xl">Nothing found!</Text>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
