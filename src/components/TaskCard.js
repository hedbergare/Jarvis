import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/vars";
import { fonts } from "../../constants/fonts";

const TaskCard = () => {
  return (
    <View style={styles.TaskCard}>
      <Text style={[styles.TaskCardTitle, fonts.heading3]}>
        Drink a big glass of water
      </Text>
      <Text style={fonts.subText}>Due to: Tue 10 Jun</Text>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  TaskCard: {
    width: "80%",
    marginLeft: "10%",
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginBottom: 20,
  },
  TaskCardTitle: { color: "black" },
});
