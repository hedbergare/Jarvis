import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";
import SwipeButtons from "./SwipeButtons";

const GoalCard = ({
  navigation,
  goal,
  timeRemaining,
  progress,
  estimatedDate,
  goodPhase,
  amountDifference,
  daysPassed,
  daysTotal,
  handleDelete,
  handleEdit,
}) => {
  const swipeableRef = React.useRef(null);
  return (
    <>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={() => (
          <SwipeButtons
            onDeletePress={() => {
              handleDelete(goal.key);
              swipeableRef.current.close();
            }}
            onEditPress={() => {
              handleEdit(goal);
              swipeableRef.current.close();
            }}
          ></SwipeButtons>
        )}
        friction={true ? 2 : 10000}
        rightThreshold={20}
        containerStyle={styles.swipeContainer}
      >
        <View style={styles.GoalCard}>
          <TouchableOpacity
            style={styles.content}
            onPress={() =>
              navigation.navigate("ViewGoalScreen", {
                goal,
                timeRemaining,
                progress,
                estimatedDate,
                goodPhase,
                amountDifference,
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
        </View>
      </Swipeable>
    </>
  );
};

export default GoalCard;

const styles = StyleSheet.create({
  GoalCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

    backgroundColor: colors.white,
  },
  swipeContainer: {
    width: "100%",
    marginBottom: 10,
  },
  content: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
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
