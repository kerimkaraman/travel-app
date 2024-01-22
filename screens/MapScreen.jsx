import axios from "axios";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import LoadingScreen from "./LoadingScreen";

export default function MapScreen({ route, navigation }) {
  const [location, setLocation] = useState({
    lat: 0,
    long: 0,
  });
  const { name } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.api-ninjas.com/v1/geocoding?city=${name}`, {
        headers: {
          "X-Api-Key": "VL0YL4lIj3Q/GO2jeWT9dQ==Y87DfcIGB5OKtFVm",
        },
      })
      .then((res) => {
        location.lat = res.data[0].latitude;
        location.long = res.data[0].longitude;
      })
      .then(
        setTimeout(() => {
          setIsLoading(false);
        }, 3000)
      )
      .catch((err) => console.error(err));
  });
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View className="flex-1">
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: location.lat,
          longitude: location.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <View>
          <Pressable className="px-4 pt-16" onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </Pressable>
        </View>
      </MapView>
    </View>
  );
}
