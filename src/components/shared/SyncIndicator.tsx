import React from "react";
import { Text, Modal } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { usePromiseTracker } from "react-promise-tracker";

import { BarIndicator } from "react-native-indicators";

const spinners = () => <BarIndicator color="#09427A" size={100} />;

export const SyncIndicator = (props: any) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      {promiseInProgress === true ? (
        <Modal
          backdropStyle={styles.backdrop}
          onBackdropPress={() => {}}
          visible={true}
        >
          <View style={styles.content}>
            <Text category="h5" style={{ color: "white", marginBottom: 15 }}>
              Buscando articulo..
            </Text>
            {spinners()}
          </View>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
