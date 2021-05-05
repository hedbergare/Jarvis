import React from "react";
import { StyleSheet, Text } from "react-native";
import { fontFamilies } from "../../constants/vars";

const Font = ({ text, textStyle }) => {
  return <Text style={[textStyle, styles.font]}>{text}</Text>;
};

export default Font;

const styles = StyleSheet.create({
  font: { fontFamily: fontFamilies.primary },
});
