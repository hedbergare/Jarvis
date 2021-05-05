import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/vars";

const DisplayField = ({ text, src, textStyle }) => {
  return (
    <View style={styles.DisplayField}>
      <Image style={styles.icon} source={src} />
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

export default DisplayField;

const styles = StyleSheet.create({
  DisplayField: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + "30",
  },
  icon: {
    marginRight: 20,
    width: 50,
    height: 50,
  },
});
