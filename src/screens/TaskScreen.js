import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import DisplayField from "../components/DisplayField";
import EditButton from "../components/EditButton";
import { fonts } from "../../constants/fonts";
import Font from "../components/Font";
import { colors, icons } from "../../constants/vars";
import DateService from "../services/DateService";

const TaskScreen = ({ navigation, route }) => {
  const task = route.params.task;
  const list = route.params.list;

  const handleEditPress = () => {
    navigation.navigate("CreateTaskStackScreen", {
      screen: "CreateTaskScreen",
      params: { listName: list.name, task: task, hideBackArrow: false },
    });
  };

  return (
    <View style={styles.TaskScreen}>
      <ScreenHeader
        title={task.completed ? "Completed task" : "Uncompleted task"}
        navigation={navigation}
      />
      <DisplayField
        text={task.name}
        src={icons.alphabet}
        textStyle={fonts.heading3}
      />
      <DisplayField
        text={DateService.formatTimeStamp(task.deadline)}
        src={icons.calender}
        textStyle={fonts.heading3}
      />
      <View style={styles.descriptionContainer}>
        <Font textStyle={fonts.heading4} text="Description:"></Font>

        <Font textStyle={styles.descriptionText} text={task.description}></Font>
      </View>
      <View style={styles.editButton}>
        <EditButton handleOnPress={() => handleEditPress()} />
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
    position: "absolute",
    bottom: 70,
    right: 70,
  },
});
