import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import DisplayField from "../components/DisplayField";
import EditButton from "../components/EditButton";
import { fonts } from "../../constants/fonts";
import Font from "../components/Font";
import { colors } from "../../constants/vars";

const TaskScreen = ({ navigation, route }) => {
  const task = route.params;

  return (
    <View style={styles.TaskScreen}>
      <ScreenHeader title={"Task"} navigation={navigation} />
      <DisplayField
        text={task.name}
        src={require("../assets/icon-alphabet.png")}
        textStyle={fonts.heading2}
      />
      <DisplayField
        text={task.deadline}
        src={require("../assets/icon-color-calender.png")}
        textStyle={fonts.heading3}
      />
      <View style={styles.descriptionContainer}>
        <Text style={fonts.heading3}>
          <Font text="Description:"></Font>
        </Text>
        <Text style={[styles.descriptionText, fonts.heading4]}>
          <Font text={task.description}></Font>
        </Text>
      </View>
      <View style={styles.editButton}>
        <EditButton />
      </View>
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  TaskScreen: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  descriptionContainer: {
    width: "90%",
  },
  descriptionText: {
    padding: 10,
  },
  editButton: {
    marginLeft: 180,
    marginTop: 0,
  },
});
