import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../constants/vars";
import Font from "./Font";

const DecrementButton = ({ handleOnPress, checkboxState }) => {
  return (
    <TouchableOpacity
      style={styles.DecrementButton}
      disabled={checkboxState}
      onPress={() => {
        handleOnPress();
      }}
    >
      <Font textStyle={styles.DecrementButtonText} text="-"></Font>
    </TouchableOpacity>
  );
};

export default DecrementButton;

const styles = StyleSheet.create({
  DecrementButton: {
    backgroundColor: colors.yellowLight,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  DecrementButtonText: {
    fontWeight: "bold",
    color: colors.yellow,
  },
});
