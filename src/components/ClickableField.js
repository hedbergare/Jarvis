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
      <View style={styles.iconContainer}>
        <SvgComponent content={src} />
      </View>
      <Font text={text} textStyle={[fonts.heading4, styles.title]} />
      <Ionicons
        style={styles.arrow}
        name="chevron-forward-outline"
        color={colors.black}
        size={30}
      />
    </TouchableOpacity>
  );
};

export default ClickableField;

const styles = StyleSheet.create({
  ClickableField: {
    minWidth: "80%",
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,

    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
  iconContainer: {
    marginLeft: 5,
  },
  title: {
    marginLeft: 15,
  },
  arrow: {
    position: "absolute",
    right: 15,
  },
});
