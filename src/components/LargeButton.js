import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Font from "./Font";
import { colors } from "../../constants/vars";
import { fonts } from "../../constants/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";

const LargeButton = ({ backgroundColor, text, color }) => {
  return (
    <View style={[styles.LargeButton, { backgroundColor: backgroundColor }]}>
      <Text style={[fonts.buttonText, styles.text, { color: color }]}>
        <Font text={text}></Font>
      </Text>
    </View>
  );
};

export default LargeButton;

const styles = StyleSheet.create({
  LargeButton: {
    justifyContent: "center",
    textAlign: "center",
    width: 278,
    height: 59,
    borderRadius: 6,
  },
  text: {
    textAlign: "center",
  },
});
