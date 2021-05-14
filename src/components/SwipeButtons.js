import React from "react";
import { StyleSheet, TouchableOpacity, Animated, View } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";
import { Ionicons } from "@expo/vector-icons";

const SwipeButtons = ({ onDeletePress, onEditPress }) => {
  return (
    <View style={styles.SwipeButtons}>
      <TouchableOpacity style={styles.edit} onPress={() => onEditPress()}>
        <Ionicons size={30} name="create-outline" color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.delete} onPress={() => onDeletePress()}>
        <Ionicons size={30} name="trash-outline" color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default SwipeButtons;

const styles = StyleSheet.create({
  SwipeButtons: {
    flexDirection: "row",
  },
  edit: {
    justifyContent: "center",
    backgroundColor: colors.green,
    paddingHorizontal: 10,
  },
  delete: {
    justifyContent: "center",
    backgroundColor: colors.red,
    paddingHorizontal: 10,
  },
});
