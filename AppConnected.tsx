import React from "react";
import { useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping, light, dark } from "@eva-design/eva";
import { default as customtheme } from "./customtheme.json";
import { THEME_LIGHT } from "./src/constants/shared";
import { RootState } from "./src/store/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { SyncIndicator } from "./src/components/shared/SyncIndicator";

const AppConnected = () => {
  const theme: string = useSelector(
    (state: RootState) => state.config.themeMode
  );
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        mapping={mapping}
        theme={
          theme === THEME_LIGHT
            ? { ...light, ...customtheme }
            : { ...dark, ...customtheme }
        }
      >
        <SafeAreaProvider>
          <>
          <SyncIndicator />
            <AppNavigator />
          </>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
};

export default AppConnected;
