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
import { colors } from "../../constants/vars";
import { fonts } from "../../constants/fonts";

const ScreenHeader = () => {
  const handleBackArrowIcon = () => {
    {
      /* todo: fix routing on click. */
    }
  };
  const handleSettingsIcon = () => {
    {
      /* todo: fix routing on click. */
    }
  };
  return (
    <ImageBackground
      style={styles.screenHeader}
      source={require("../assets/screen-header.png")}
    >
      <TouchableOpacity
        style={styles.screenHeaderBackArrowIcon}
        onPress={handleBackArrowIcon}
      >
        <Image source={require("../assets/icon-back-arrow.png")} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.screenHeaderSettingsIcon}
        onPress={handleSettingsIcon}
      >
        <Image source={require("../assets/icon-settings.png")} />
      </TouchableOpacity>
      <View style={styles.screenHeaderText}>
        <Text style={[fonts.heading1, styles.title]}>
          <Font text="General"></Font>
        </Text>
        <Text style={[styles.screenHeaderSubText, fonts.subText]}>
          <Font text="Saturday 20th April"></Font>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  screenHeader: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  screenHeaderBackArrowIcon: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  screenHeaderSettingsIcon: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  screenHeaderText: {
    transform: [{ translateX: "-90%" }, { translateY: "-20%" }],
  },
  title: {
    color: colors.white,
  },
  screenHeaderSubText: {
    transform: [{ translateX: 10 }],
    color: colors.gray,
  },
});
