import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";

const GoalCard = ({
  navigation,
  goal,
  timeRemaining,
  progress,
  estimatedDate,
  goodPhase,
  dayDifference,
  daysPassed,
  daysTotal,
}) => {
  return (
    <TouchableOpacity
      style={styles.GoalCard}
      onPress={() =>
        navigation.navigate("ViewGoalScreen", {
          goal,
          timeRemaining,
          progress,
          estimatedDate,
          goodPhase,
          dayDifference,
          daysTotal,
          daysPassed,
        })
      }
    >
      <View style={styles.textContainer}>
        <Font text={timeRemaining + " Days"} textStyle={fonts.heading2} />
        <Font text="Remaining" textStyle={fonts.heading5} />
      </View>
      <View style={styles.middleBorder}></View>
      <View style={styles.textContainer}>
        <Font text={goal.name} textStyle={fonts.lightHeading2} />
        <Font
          text={"progress made: " + progress + "%"}
          textStyle={fonts.subText}
        />
      </View>
    </TouchableOpacity>
  );
};

export default GoalCard;

const styles = StyleSheet.create({
  GoalCard: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.black + "30",
    padding: 15,
  },
  middleBorder: {
    width: 20,
    marginHorizontal: 20,
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
  },
  textContainer: {
    minHeight: 60,
    justifyContent: "flex-end",
  },
});
