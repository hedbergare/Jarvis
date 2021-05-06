import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";
import SvgComponent from "./SvgComponent";

const CreateField = ({ src, placeholder, title, textChanged }) => {
  return (
    <View style={styles.CreateField}>
      <SvgComponent content={src} iconStyle={styles.iconStyle} />
      <View>
        <Text style={fonts.subText}>
          <Font text={title + ":"}></Font>
        </Text>
        <TextInput
          style={fonts.heading5}
          placeholder={placeholder}
          onChangeText={(text) => textChanged(text)}
        ></TextInput>
      </View>
    </View>
  );
};

export default CreateField;

const styles = StyleSheet.create({
  CreateField: {
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingBottom: 30,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + "30",
  },
  iconStyle: {
    marginRight: 10,
  },
});
