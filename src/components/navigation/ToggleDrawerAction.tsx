import React from "react";
import { useSelector } from "react-redux";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TopNavigationAction, Icon } from "@ui-kitten/components";
//Store
import { RootState } from "../../store/store";
//Constants
import { THEME_DARK, PRIMARY_COLOR_700 } from "../../constants/shared";

interface Props {
  navigation: DrawerNavigationProp<any, any>;
}

export const ToggleDrawerAction = ({ navigation }: Props) => {
  const themeMode: string = useSelector(
    (state: RootState) => state.config.themeMode
  );

  return (
    <TopNavigationAction
      icon={(props) => (
        <TouchableOpacity>
          <Icon
            {...props}
            name="menu"
            fill={themeMode === THEME_DARK ? "white" : PRIMARY_COLOR_700}
          />
        </TouchableOpacity>
      )}
      onPress={navigation.toggleDrawer}
    />
  );
};
