import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { colors } from "../../constants/vars";
import { fonts } from "../../constants/fonts";
import Tag from "./Tag.js";
import Font from "./Font";
import { useSelector, useStore, useDispatch } from "react-redux";
import { completeTask } from "../../redux/actions/TaskListActions";
import { completeSharedTask } from "../../redux/actions/SharedTaskListActions";
import firebase from "firebase/app";
import "firebase/database";
import DateService from "../services/DateService";
require("firebase/auth");
const TaskCard = ({ handleOnPress, task, list }) => {
  const dispatch = useDispatch();

  const goals = useSelector((state) => state.goals);

  const [checkboxState, setCheckboxState] = React.useState(task.completed);

  const renderGoalTags = () => {
    if (task.connected_goal) {
      const goalId = Object.keys(task.connected_goal)[0];
      if (goals) {
        for (let goal of goals) {
          if (goalId === goal.key) {
            /* Connect the color to the theme of the goal */
            return <Tag color={colors.green} text={goal.name}></Tag>;
          }
        }
      }
    }
  };

  const handleCompleteTask = () => {
    if (list.userId === firebase.auth().currentUser.uid) {
      dispatch(completeTask(list.key, task.key, !checkboxState));
    } else {
      dispatch(completeSharedTask(list.key, task.key, !checkboxState));
    }

    setCheckboxState(!checkboxState);
  };

  return (
    <View style={[styles.TaskCard, { opacity: checkboxState ? 0.5 : 1 }]}>
      <View style={styles.content}>
        <BouncyCheckbox
          isChecked={checkboxState}
          size={35}
          fillColor={colors.green}
          iconStyle={{
            borderColor: colors.green,
          }}
          onPress={handleCompleteTask}
        />

        <TouchableOpacity
          style={styles.TaskCardText}
          onPress={() => handleOnPress(task)}
        >
          <Text
            style={[
              styles.TaskCardTitle,
              fonts.heading3,
              {
                textDecorationLine: checkboxState ? "line-through" : "none",
              },
            ]}
          >
            <Font text={task.name} />
          </Text>
          <Text
            style={
              (fonts.subText,
              {
                textDecorationLine: checkboxState ? "line-through" : "none",
              })
            }
          >
            <Font
              text={"Due to: " + DateService.formatTimeStamp(task.deadline)}
              textStyle={styles.dateText}
            />
          </Text>
        </TouchableOpacity>
        <Image
          style={styles.trashIcon}
          source={require("../assets/icon-delete-trash-can.png")}
        />
      </View>
      <View style={styles.tagContainer}>{renderGoalTags()}</View>
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
    paddingBottom: 10,
    marginBottom: 20,
  },
  content: {
    flexDirection: "row",
    /* justifyContent: "space-around", */
  },
  TaskCardText: {
    /* transform: [{ translateX: -15 }], */
  },
  TaskCardTitle: {
    color: "black",
  },
  tagContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  dateText: {
    fontSize: 11,
  },
  trashIcon: {
    position: "absolute",
    right: 0,
  },
});
