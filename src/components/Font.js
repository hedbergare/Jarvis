import React from "react";
import { StyleSheet, Text } from "react-native";
import { fontFamilies } from "../../constants/vars";

const Font = ({ text }) => {
  return <Text style={styles.font}>{text}</Text>;
};

export default Font;

const styles = StyleSheet.create({
  font: { fontFamily: fontFamilies.primary },
});
