import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { colors } from "../../constants/vars";

const EditButton = () => {
  return (
    <View style={styles.EditButton}>
      <Image
        style={styles.icon}
        source={require("../assets/icon-pen-white.png")}
      />
    </View>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  EditButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 62,
    height: 62,
    backgroundColor: colors.blueDark,
    borderRadius: 31,
  },
});
