import React from "react";
import { Image, StyleSheet, Text, View, TextInput } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import SvgComponent from "./SvgComponent";

const InputField = ({
  placeHolderText,
  src,
  secureEntry,
  textChanged,
  value,
  editable,
}) => {
  return (
    <View style={styles.InputField}>
      <SvgComponent content={src} />
      <TextInput
        secureTextEntry={secureEntry}
        style={[styles.input, fonts.heading4]}
        placeholder={placeHolderText}
        onChangeText={(text) => textChanged(text)}
        value={value}
        editable={editable}
        returnKeyType="done"
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  InputField: {
    minWidth: "70%",
    height: 30,
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.grayDark,
    marginBottom: 20,
  },
  input: {
    marginLeft: 10,
    minWidth: 150,
  },
});
