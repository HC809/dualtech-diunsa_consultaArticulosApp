import React from "react";
import { useSelector } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TopNavigationAction, Icon } from "@ui-kitten/components";
//Store
import { RootState } from "../../store/store";
//Constants
import { THEME_DARK, PRIMARY_COLOR_700 } from "../../constants/shared";

interface Props {
  navigation: StackNavigationProp<any, any>;
  disabled: boolean;
}

export const BackAction = ({ navigation, disabled }: Props) => {
  const themeMode: string = useSelector(
    (state: RootState) => state.config.themeMode
  );

  return (
    <TopNavigationAction
      icon={(props) => (
        <TouchableOpacity>
          <Icon
            {...props}
            name="arrow-back"
            fill={
              themeMode === THEME_DARK
                ? "white"
                : !disabled
                ? PRIMARY_COLOR_700
                : "gray"
            }
          />
        </TouchableOpacity>
      )}
      disabled={disabled}
      onPress={() => navigation.goBack()}
    />
  );
};
