import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fonts } from "../../constants/fonts";

const Tag = ({ color, text }) => {
  return (
    <View
      style={{
        borderColor: color,
        borderWidth: 1,
        borderRadius: "25%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5,
      }}
    >
      <Text style={[fonts.subText, { color: color }]}>{text}</Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({});
