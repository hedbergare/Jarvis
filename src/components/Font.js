import React from "react";
import { StyleSheet, Text } from "react-native";
import { fontFamilies } from "../../constants/vars";

const Font = ({ text, textStyle, font }) => {
  return <Text style={[font, textStyle, styles.font]}>{text}</Text>;
};

export default Font;

const styles = StyleSheet.create({
  font: { fontFamily: fontFamilies.primary },
});
