import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";
const ConfirmButton = () => {
  return (
    <TouchableOpacity
      style={styles.ConfirmButton}
      onPress={() => handleAddTask()}
    >
      <Text style={[fonts.heading3, styles.text]}>
        <Font text="Add Task"></Font>
      </Text>
    </TouchableOpacity>
  );
};

export default ConfirmButton;

const styles = StyleSheet.create({
  ConfirmButton: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.purple,
    borderRadius: 50,
  },
  text: {
    color: colors.white,
  },
});
