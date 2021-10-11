import React from "react";
import { View, StyleSheet } from "react-native";
import { Spinner } from "@ui-kitten/components";

export const LoadingIndicator = () => (
  <View style={styles.indicator}>
    <Spinner size="giant" />
  </View>
);


const styles = StyleSheet.create({
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
