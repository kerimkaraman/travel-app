import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PlaceCard({ id, thumbnail, name, rating }) {
  const width = Dimensions.get("screen").width / 2.3;
  const nav = useNavigation();

  return (
    <Animated.View style={{ width: width }} entering={FadeInLeft}>
      <Pressable
        onPress={() => nav.navigate("PlaceScreen", { id: id })}
        className="w-[100%] h-[200px]"
      >
        <ImageBackground
          imageStyle={{
            width: width,
            height: 200,
            borderRadius: 15,
            objectFit: "cover",
          }}
          className="p-4"
          source={{ uri: thumbnail }}
        >
          <View className="mt-24 space-y-4">
            <View className="self-start bg-[#4D5753] py-2 px-4 rounded-full">
              <Text className="text-xs text-white font-semibold">{name}</Text>
            </View>
            <View className="self-start bg-[#4D5753] flex-row items-center justify-center space-x-2 rounded-full py-1 px-3">
              <Entypo name="star" size={16} color="yellow" />
              <Text className="text-xs text-white">{rating}</Text>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    </Animated.View>
  );
}
