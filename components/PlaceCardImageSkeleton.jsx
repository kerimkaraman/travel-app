import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import { Dimensions } from "react-native";
const width = Dimensions.get("screen").width;
const PlaceCardImageSkeleton = (props) => (
  <ContentLoader
    speed={0.5}
    width={width - 30}
    height={400}
    viewBox={`0 0 ${width - 30} 400`}
    backgroundColor="#d9d9d9"
    foregroundColor="#ededed"
    {...props}
  >
    <Rect x="0" y="0" rx="10" ry="10" width={width - 30} height="400" />
  </ContentLoader>
);

export default PlaceCardImageSkeleton;
