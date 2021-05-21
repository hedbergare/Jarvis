import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../constants/vars";
import { Ionicons } from "@expo/vector-icons";

const EditButton = ({ handleOnPress }) => {
  return (
    <TouchableOpacity style={styles.EditButton} onPress={handleOnPress}>
      <Ionicons name={"create-outline"} size={28} color={colors.white} />
    </TouchableOpacity>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  EditButton: {
    justifyContent: "center",
    paddingLeft: 4,
    alignItems: "center",
    width: 55,
    height: 55,
    backgroundColor: colors.blueDark,
    borderRadius: 31,
  },
});
