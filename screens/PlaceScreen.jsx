import { View, Text } from "react-native";
import React, { useEffect } from "react";
import PagerView from "react-native-pager-view";

export default function PlaceScreen({ route }) {
  const { id } = route.params;

  const getData = async () => {
    try {
    } catch {}
  };

  useEffect(() => {
    getData().then();
  });
  return <View className="flex-1 bg-white"></View>;
}
