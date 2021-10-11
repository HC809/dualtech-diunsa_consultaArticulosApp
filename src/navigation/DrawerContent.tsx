import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, SafeAreaView } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  // DrawerContentScrollView,
} from "@react-navigation/drawer";
import {
  Avatar,
  IndexPath,
  Drawer,
  DrawerElement,
  DrawerItem,
  Layout,
  Text,
  Divider,
} from "@ui-kitten/components";
//Icons
import { ConfigIcon, ProductosIcon } from "../components/shared/Icons";
//Store
import { RootState } from "../store/store";
//Styles
import { styles } from "../theme/appTheme";

export const DrawerContent = ({
  navigation,
  state,
}: DrawerContentComponentProps<DrawerContentOptions>): DrawerElement => {
  const { name } = useSelector((state: RootState) => state.auth);

  const renderHeader = () => (
    <Layout style={styles.drawerHeader} level="4">
      <View>
        <Avatar
          style={{ width: 150, height: 75 }}
          shape="square"
          size="giant"
          source={require("../../assets/diunsa_logo.png")}
        />
        <Text status={"primary"} style={styles.profileName} category="s1">
          Control Entradas y Salidas
        </Text>
      </View>
    </Layout>
  );

  const renderFooter = () => (
    <React.Fragment>
      <Divider style={{ backgroundColor: "#1160A3" }} />
      <Text style={{ padding: 10 }} category="s1" appearance="hint">
        {`Usuario: ${name || "No definido"}`}
      </Text>
      <Text style={{ padding: 10 }} appearance="hint">
        Versión 1.0.0
      </Text>
    </React.Fragment>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer
        header={renderHeader}
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
        footer={renderFooter}
      >
        {/* <DrawerItem title="Inicio" accessoryLeft={HomeIcon} /> */}
        <DrawerItem title="Entrada Producto" accessoryLeft={ProductosIcon} />
        <DrawerItem title="Configuración" accessoryLeft={ConfigIcon} />
      </Drawer>
    </SafeAreaView>
  );
};
