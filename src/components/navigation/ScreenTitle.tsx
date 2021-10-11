import React from "react";
import { useSelector } from "react-redux";
import { Text } from "@ui-kitten/components";
//Store
import { RootState } from "../../store/store";
//Constants
import { THEME_DARK, PRIMARY_COLOR_700 } from "../../constants/shared";

interface Props {
  title: string;
}

export const ScreenTitle = ({ title }: Props) => {
  const themeMode: string = useSelector(
    (state: RootState) => state.config.themeMode
  );

  return (
    <Text
      style={{ color: themeMode === THEME_DARK ? "white" : PRIMARY_COLOR_700 }}
      category="h6"
    >
      {title}
    </Text>
  );
};
