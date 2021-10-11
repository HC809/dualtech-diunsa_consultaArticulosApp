import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerScreenProps } from "@react-navigation/drawer";
import {
  Layout,
  TopNavigation,
  Divider,
  Toggle,
  Text,
} from "@ui-kitten/components";
//Components
import { ScreenTitle } from "../components/navigation/ScreenTitle";
import { ToggleDrawerAction } from "../components/navigation/ToggleDrawerAction";
import { SettingSection } from "../components/shared/SettingSection";
//Actions
import { changeTheme } from "../store/actions/config/configActions";
//Constants
import { THEME_DARK, THEME_LIGHT } from "../constants/shared";
//Store
import { RootState } from "../store/store";
//Styles
import { styles } from "../theme/appTheme";
//Actions
import { logout } from "../store/actions/auth/authActions";

interface Props extends DrawerScreenProps<any, any> {}

export const ConfigScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const themeMode: string = useSelector(
    (state: RootState) => state.config.themeMode
  );

  const { name } = useSelector((state: RootState) => state.auth);

  const changeThemeMode = () => {
    dispatch(changeTheme(themeMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT));
  };

  const renderLeftAction = () => <ToggleDrawerAction navigation={navigation} />;

  return (
    <SafeAreaView style={styles.flex}>
      <TopNavigation
        title={() => <ScreenTitle title="Configuración" />}
        accessoryLeft={renderLeftAction}
      />
      <Divider style={styles.dividerColor} />
      <Layout style={styles.flex}>
        <SettingSection hint="Usuario" onPress={() => {}}>
          <Text appearance="hint">{name || "No definido"}</Text>
        </SettingSection>
        <SettingSection hint="Modo Oscuro" onPress={() => {}}>
          <Toggle
            checked={themeMode === THEME_DARK}
            onChange={changeThemeMode}
          />
        </SettingSection>
        <SettingSection
          hint="Cerrar Sesion"
          onPress={() => dispatch(logout())}
        />
      </Layout>
    </SafeAreaView>
  );
};
