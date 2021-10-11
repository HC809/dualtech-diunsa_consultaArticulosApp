import React from "react";
import { View, Image } from "react-native";

export const Logo = () => {
  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Image
        source={require("../../../assets/diunsa_logo.png")}
        style={{ width: 180, height: 120 }}
      />
    </View>
  );
};
