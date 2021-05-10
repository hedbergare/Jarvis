import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";

const TaskListCard = ({ list, onPressHandler }) => {
  const getTotalTasks = () => {
    if (list.tasks) {
      const tasks = Object.values(list.tasks);
      return Object.keys(tasks).length;
    } else {
      return 0;
    }
  };

  const getCompletedTasks = () => {
    let counter = 0;
    if (list.tasks) {
      for (let task of Object.values(list.tasks)) {
        if (task.completed) {
          counter++;
        }
      }
    }
    return counter;
  };

  const calculateProgress = () => {
    if (!list.completed) {
      if (total == 0) {
        return 0;
      } else {
        return Math.floor((completed / total) * 100);
      }
    } else {
      return 100;
    }
  };
  const completed = getCompletedTasks();
  const total = getTotalTasks();

  return (
    <TouchableOpacity
      style={styles.TaskListCard}
      onPress={() => onPressHandler(list)}
    >
      <ProgressCircle
        percent={calculateProgress()}
        radius={25}
        borderWidth={8}
        color={colors.blueDark}
        shadowColor={colors.whiteDark}
        bgColor={colors.white}
      >
        <Text style={styles.progressText}>
          <Font text={calculateProgress() + "%"}></Font>{" "}
        </Text>
      </ProgressCircle>
      <View style={styles.textContainer}>
        <Text
          style={[
            fonts.heading2,
            {
              textDecorationLine: list.completed ? "line-through" : "none",
            },
          ]}
        >
          <Font text={list.name}></Font>
        </Text>
        <Text style={fonts.subText}>
          <Font text={completed + " out of " + total}></Font>
        </Text>
      </View>
      <Image
        style={styles.arrow}
        source={require("../assets/icon-arrow-right.png")}
      />
    </TouchableOpacity>
  );
};

export default TaskListCard;

const styles = StyleSheet.create({
  TaskListCard: {
    alignItems: "center",
    margin: 10,
    padding: 10,
    width: "80%",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  textContainer: {
    width: "70%",
  },
  arrow: {
    right: 0,
  },
});
