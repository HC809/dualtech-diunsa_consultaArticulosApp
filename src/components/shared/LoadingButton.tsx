import React from "react";
import { View, StyleSheet } from "react-native";
import { Spinner, Button } from "@ui-kitten/components";

const LoadingIndicator = () => (
  <View style={styles.indicator}>
    <Spinner size="small" />
  </View>
);

interface Props {
  text: string;
  status: string;
}

export const LoadingButton = ({ text, status }: Props) => (
  <Button
    appearance="outline"
    accessoryRight={LoadingIndicator}
    status={status}
  >
    {`${text}...`}
  </Button>
);

const styles = StyleSheet.create({
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
