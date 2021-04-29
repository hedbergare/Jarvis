import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import DisplayField from "../components/DisplayField";
import EditButton from "../components/EditButton";

const TaskScreen = () => {
  return (
    <View style={styles.TaskScreen}>
      <ScreenHeader />
      <DisplayField
        text="Drink a huge glass of water"
        src={require("../assets/icon-alphabet.png")}
        textStyle={fonts.heading2}
      />
      <DisplayField
        text="10th May, Thursday"
        src={require("../assets/icon-color-calender.png")}
        textStyle={fonts.heading3}
      />
      <View style={styles.descriptionContainer}>
        <Text style={fonts.heading3}>
          <Font text="Description:"></Font>
        </Text>
        <Text style={[styles.descriptionText, fonts.heading4]}>
          <Font
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris."
          ></Font>
        </Text>
      </View>
      <EditButton />
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  TaskScreen: {
    flex: 1,
  },
});
