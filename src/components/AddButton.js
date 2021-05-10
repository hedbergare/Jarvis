import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/vars";

const AddButton = ({ handleOnPress }) => {
  return (
    <TouchableOpacity style={styles.AddButton} onPress={handleOnPress}>
      <Ionicons
        style={styles.icon}
        style={styles.modalBackground}
        name="add-outline"
        color={colors.white}
        size={70}
      />
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  AddButton: {
    position: "absolute",
    top: "85%",
    alignSelf: "center",
    paddingLeft: 2,
    paddingTop: -1,
    width: 70,
    height: 70,
    backgroundColor: colors.blueDark,
    borderRadius: 50,
  },
  icon: {
    height: 60,
    width: 60,
    textAlign: "center",
  },
});
