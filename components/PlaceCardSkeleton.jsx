import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import { Dimensions } from "react-native";
const width = Dimensions.get("screen").width / 2.3;
const PlaceCardSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={width}
    height={200}
    viewBox={`0 0 ${width} 200`}
    backgroundColor="#d9d9d9"
    foregroundColor="#ededed"
    {...props}
  >
    <Rect x="0" y="0" rx="10" ry="10" width={width} height="200" />
  </ContentLoader>
);

export default PlaceCardSkeleton;
