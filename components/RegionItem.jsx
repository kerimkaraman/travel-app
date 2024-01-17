import { Text, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClickedId, setClickedRegion } from "../store/regionStyleSlice";

export default function RegionItem({ data, id }) {
  const { clickedId } = useSelector((state) => state.regionStyle);
  const dispatch = useDispatch();

  const setOnPress = () => {
    dispatch(setClickedId(id));
    dispatch(setClickedRegion(data));
  };

  return (
    <Pressable
      onPress={() => setOnPress()}
      style={{ backgroundColor: id == clickedId ? "#F2F9FE" : "transparent" }}
      className="p-2 px-4 rounded-full"
    >
      <Text style={{ color: id == clickedId ? "#186FF1" : "#B9B9B8" }}>
        {data}
      </Text>
    </Pressable>
  );
}
