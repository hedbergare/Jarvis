import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/vars";
import { fonts } from "../../constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import SvgComponent from "./SvgComponent";
import Font from "./Font";

const ToggleInput = ({ title, icon, value, handleOnPress }) => {
  return (
    <View style={styles.ToggleInput}>
      <SvgComponent content={icon} iconStyle={styles.iconStyle} />
      <View>
        <Text style={fonts.subText}>
          <Font text={title + ":"}></Font>
        </Text>
        <TouchableOpacity onPress={handleOnPress}>
          <Text style={fonts.heading3}>
            <Font text={value} textStyle={styles.valueText}></Font>
            <View style={styles.chevronStyle}>
              <Ionicons name="chevron-down-outline" color={colors.black} />
            </View>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToggleInput;

const styles = StyleSheet.create({
  ToggleInput: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: "90%",
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + "30",
  },
  iconStyle: {
    marginRight: 10,
  },
  chevronStyle: {
    justifyContent: "center",
    paddingLeft: 5,
  },
});
