import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/vars";

const TaskListCard = () => {
  return (
    <View style={styles.TaskListCard}>
      <Text>sdfasdfnasf.</Text>
    </View>
  );
};

export default TaskListCard;

const styles = StyleSheet.create({
  TaskListCard: {
    width: "80%",

    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
});
