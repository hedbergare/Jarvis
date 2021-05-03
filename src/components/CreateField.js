import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";

const CreateField = ({ src, placeholder, title }) => {
  return (
    <View style={styles.CreateField}>
      <Image style={styles.icon} source={src} />
      <View>
        <Font text={title + ":"}></Font>
        <TextInput style={fonts.heading5} placeholder={placeholder}></TextInput>
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
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + "30",
  },
  icon: {
    marginRight: 20,
    width: 50,
    height: 50,
  },
});
