import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors, icons } from "../../constants/vars";
import Font from "../components/Font";
import { useSelector, useStore, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import SvgComponent from "../components/SvgComponent";
import TaskCard from "../components/TaskCard";

import DateService from "../services/DateService";

const HomeScreen = ({ navigation }) => {
  const taskLists = useSelector((state) => state.taskLists);

  return (
    <View style={styles.container}>
      <SvgComponent
        content={icons.homeScreenHeader}
        iconStyle={styles.screenHeader}
      />
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        <Ionicons name="settings-outline" color={colors.whiteDark} size={32} />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <SvgComponent content={icons.logo} iconStyle={styles.logo} />
      </View>

      <View style={styles.nameContainer}>
        <Font
          text="Good Morning,"
          font={fonts.heading1Light}
          textStyle={styles.headerText}
        ></Font>
        <Font
          text={"Patrik"}
          font={fonts.heading1}
          textStyle={styles.headerText}
        ></Font>
        <Text style={[styles.date, fonts.subText]}>
          <Font text={DateService.formatDate(new Date())}></Font>
        </Text>
      </View>
      <Font text="Upcoming Tasks:" font={fonts.heading1}></Font>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIcon: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  logoContainer: {
    position: "absolute",
    top: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {},
  screenHeader: {
    minWidth: "100%",
    height: 100,
    transform: [{ translateY: -30 }],
    position: "absolute",
    top: 0,
    left: 0,
    height: 250,
    justifyContent: "center",
  },
  date: {
    color: colors.green,
    transform: [{ translateY: -5 }],
  },
  nameContainer: {
    position: "absolute",
    top: 190,
    left: 20,
  },
  headerText: {
    color: colors.white,
  },
});
