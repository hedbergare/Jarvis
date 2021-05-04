import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import Font from "./Font";
import { colors, icons } from "../../constants/vars";
import { fonts } from "../../constants/fonts";
import { Ionicons } from "@expo/vector-icons";

import SvgComponent from "./SvgComponent";

const ScreenHeader = ({ title, navigation }) => {
  const handleBackArrow = () => {
    {
      navigation.goBack();
    }
  };
  const handleSettingsIcon = () => {
    {
      /* todo: fix routing on click. */
    }
  };
  return (
    <View
      style={styles.screenHeader}
      // source={require("../assets/screen-header.png")}
    >
      <SvgComponent content={icons.screenHeader} iconStyle={styles.iconStyle} />

      <TouchableOpacity style={styles.backArrowIcon} onPress={handleBackArrow}>
        <Ionicons
          name="arrow-back-outline"
          color={colors.whiteDark}
          size={40}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={handleSettingsIcon}
      >
        {/* <Image source={require("../assets/icon-settings.png")} /> */}
        <Ionicons name="settings-outline" color={colors.whiteDark} size={32} />
      </TouchableOpacity>
      <View style={styles.screenHeaderText}>
        <Text style={[fonts.heading1, styles.title]}>
          <Font text={title}></Font>
        </Text>
        <Text style={[styles.date, fonts.subText]}>
          <Font text="Saturday 20th April"></Font>
        </Text>
      </View>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  screenHeader: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    // alignItems: "center",
  },
  backArrowIcon: {
    position: "absolute",
    top: 45,
    left: 20,
  },
  settingsIcon: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  screenHeaderText: {
    transform: [{ translateX: "10%" }],
    marginLeft: 20,
  },
  title: {
    color: colors.white,
  },
  date: {
    transform: [{ translateX: 10 }],
    color: colors.gray,
  },
  iconStyle: {
    transform: [{ translateY: -30 }],
    position: "absolute",
    top: 0,
    left: 0,

    resizeMode: "contain",
  },
});
