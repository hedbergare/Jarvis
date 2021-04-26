import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { fonts } from "../../constants/fonts";

import { colors } from "../../constants/vars";
import Font from "./Font";

const TaskListCard = ({ name, completed, total }) => {
  return (
    <View style={styles.TaskListCard}>
      <ProgressCircle
        percent={(completed / total) * 100}
        radius={25}
        borderWidth={8}
        color={colors.blueDark}
        shadowColor={colors.whiteDark}
        bgColor={colors.white}
      >
        <Text style={styles.progressText}>
          {Math.round((completed / total) * 100) + "%"}
        </Text>
      </ProgressCircle>
      <View style={styles.textContainer}>
        <Text style={fonts.heading2}>
          <Font text={name}></Font>
        </Text>
        <Text style={fonts.subText}>
          <Font text={completed + " out of " + total}></Font>
        </Text>
      </View>
      <Image
        style={styles.arrow}
        source={require("../assets/icon-arrow-right.png")}
      />
    </View>
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
