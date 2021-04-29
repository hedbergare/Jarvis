import React from "react";
import { Image, StyleSheet, Text, View, TextInput } from "react-native";
import { colors } from "../../constants/vars";
import { fonts } from "../../constants/fonts";

const InputField = ({ placeHolderText, src, secureEntry }) => {
  return (
    <View style={styles.InputField}>
      <Image source={src} />
      <TextInput
        secureTextEntry={secureEntry}
        style={styles.input}
        placeholder={placeHolderText}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  InputField: {
    width: 280,
    height: 30,
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.grayDark,
    marginTop: 20,
  },
  input: {
    marginLeft: 10,
    width: 200,
    fontSize: 16,
  },
  icon: {
    marginRight: 20,
  },
});
