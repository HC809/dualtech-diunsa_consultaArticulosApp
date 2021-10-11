import React from "react";
import { View, useWindowDimensions } from "react-native";

export const Background = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "#1160A3",
        width: width,
        height: height + 1000,
        transform: [{ rotate: "-70deg" }],
      }}
    />
  );
};
