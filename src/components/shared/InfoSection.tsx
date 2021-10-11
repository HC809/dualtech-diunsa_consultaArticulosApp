import React from "react";
import {
  StyleSheet,
  // TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Divider, Text } from "@ui-kitten/components";

interface SectionProps {
  hint: string;
  children?: React.ReactNode;
}

export const InfoSection = React.memo(
  (props: SectionProps): React.ReactElement<TouchableOpacityProps> => {
    const { hint, children } = props;

    return (
      <>
        <View style={[styles.container]}>
          <Text appearance="hint" category="s1">
            {hint}
          </Text>
          {children}
        </View>
        <Divider />
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
