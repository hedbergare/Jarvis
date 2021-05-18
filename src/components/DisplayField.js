import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/vars";
import Font from "./Font";
import SvgComponent from "./SvgComponent";

const DisplayField = ({ text, src, textStyle }) => {
  return (
    <View style={styles.DisplayField}>
      <SvgComponent content={src} iconStyle={styles.icon} />
      <Font text={text} textStyle={textStyle}></Font>
    </View>
  );
};

export default DisplayField;

const styles = StyleSheet.create({
  DisplayField: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + "30",
  },
  icon: { marginRight: 10 },
});
