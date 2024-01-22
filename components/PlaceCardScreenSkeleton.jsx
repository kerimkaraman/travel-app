import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import { Dimensions } from "react-native";

const PlaceCardScreenSkeleton = (props) => (
  <ContentLoader viewBox="0 0 400 475" height={475} width={400} {...props}>
    <Rect x="75" y="250" rx="4" ry="4" width="100" height="13" />
    <Rect x="75" y="270" rx="4" ry="4" width="50" height="8" />
    <Rect x="0" y="230" rx="5" ry="5" width="400" height="10" />
    <Rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
  </ContentLoader>
);

export default PlaceCardScreenSkeleton;
