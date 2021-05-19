import React from "react";
import { Image, StyleSheet, Text, View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../constants/vars";
import SvgComponent from "./SvgComponent";
import { Ionicons } from "@expo/vector-icons";
import Font from "./Font";
import { fonts } from "../../constants/fonts";

const ClickableField = ({ text, src, onPress }) => {
  return (
    <TouchableOpacity style={styles.ClickableField} onPress={onPress}>
      <SvgComponent content={src} />
      <Font text={text} textStyle={[fonts.heading4, styles.title]} />
      <Ionicons
        style={styles.arrow}
        name="chevron-forward-outline"
        color={colors.black}
        size={40}
      />
    </TouchableOpacity>
  );
};

export default ClickableField;

const styles = StyleSheet.create({
  ClickableField: {
    width: 300,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    shadowOpacity: 0.2,
    shadowOffset: { width: 3, height: 3 },
  },
  title: {
    marginLeft: 15,
  },
  arrow: {
    position: "absolute",
    right: 0,
  },
});
