import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Input } from "@ui-kitten/components";
import { SearchIcon } from "./Icons";

const window = Dimensions.get("window");

interface Props {
  searchFilterFunction: (v: string) => void;
  searchText: string;
}

export const SearchBar = React.memo(
  ({ searchFilterFunction, searchText }: Props) => {
    return (
      <View style={styles.bar}>
        <Input
          size="medium"
          autoCorrect={false}
          keyboardType="default"
          style={styles.barraItem}
          placeholder="Buscar..."
          accessoryLeft={SearchIcon}
          onChangeText={searchFilterFunction}
          value={searchText}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  bar: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  barraItem: {
    width: window.width - 20,
    maxWidth: window.width - 20,
    marginBottom: 10,
  },
});
