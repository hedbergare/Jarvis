import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../constants/vars";
import Font from "./Font";

const IncrementButton = ({ handleOnPress, checkboxState }) => {
  return (
    <TouchableOpacity
      style={styles.IncrementButton}
      disabled={checkboxState}
      onPress={() => {
        handleOnPress();
      }}
    >
      <Font textStyle={styles.IncrementButtonText} text="+"></Font>
    </TouchableOpacity>
  );
};

export default IncrementButton;

const styles = StyleSheet.create({
  IncrementButton: {
    backgroundColor: colors.blueLight,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  IncrementButtonText: {
    color: colors.blueDark,
    fontWeight: "bold",
  },
});
