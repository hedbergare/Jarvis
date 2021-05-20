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
import Swipeable from "react-native-gesture-handler/Swipeable";
import SwipeButtons from "./SwipeButtons";
require("firebase/auth");
const TaskCard = ({ handleOnPress, task, list, handleDelete, handleEdit }) => {
  const dispatch = useDispatch();

  const goals = useSelector((state) => state.goals);
  const sharedGoals = useSelector((state) => state.sharedGoals);

  const [checkboxState, setCheckboxState] = React.useState(task.completed);
  const swipeableRef = React.useRef(null);

  const renderGoalTags = () => {
    if (task.connected_goal) {
      if (goals) {
        for (let goal of goals) {
          if (task.connected_goal === goal.key) {
            return <Tag color={goal.theme} text={goal.name}></Tag>;
          }
        }
      }
      if (sharedGoals) {
        for (let goal of sharedGoals) {
          if (task.connected_goal === goal.key) {
            return <Tag color={goal.theme} text={goal.name}></Tag>;
          }
        }
      }
    }
  };

  const handleCompleteTask = () => {
    if (list.userId === firebase.auth().currentUser.uid) {
      dispatch(
        completeTask(
          list.key,
          task.key,
          !checkboxState,
          task.connected_goal,
          task.goal_value,
          list.userId
        )
      );
    } else {
      dispatch(completeSharedTask(list.key, task.key, !checkboxState));
    }

    setCheckboxState(!checkboxState);
  };

  return (
    <>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={() => (
          <SwipeButtons
            onDeletePress={() => {
              handleDelete(task);
              swipeableRef.current.close();
            }}
            onEditPress={() => {
              handleEdit(task);
              swipeableRef.current.close();
            }}
          ></SwipeButtons>
        )}
        friction={2}
        rightThreshold={20}
        containerStyle={styles.swipeContainer}
      >
        <View style={[styles.TaskCard, { opacity: checkboxState ? 0.5 : 1 }]}>
          <View style={styles.content}>
            <View style={styles.firstRow}>
              <BouncyCheckbox
                isChecked={checkboxState}
                size={35}
                fillColor={colors.green}
                iconStyle={{
                  borderColor: colors.green,
                }}
                onPress={handleCompleteTask}
                style={styles.checkboxCont}
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
                      textDecorationLine: checkboxState
                        ? "line-through"
                        : "none",
                    },
                  ]}
                >
                  <Font text={task.name} />
                </Text>
                <Text
                  style={
                    (fonts.subText,
                    {
                      textDecorationLine: checkboxState
                        ? "line-through"
                        : "none",
                    })
                  }
                >
                  <Font
                    text={
                      "Due to: " + DateService.formatTimeStamp(task.deadline)
                    }
                    textStyle={styles.dateText}
                  />
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>{renderGoalTags()}</View>
          </View>
        </View>
      </Swipeable>
    </>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  TaskCard: {
    width: "100%",

    /* alignItems: "center", */
    backgroundColor: colors.white,
  },
  content: {
    flexDirection: "column",
    paddingBottom: 15,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    width: "86%",
    /* alignItems: "center", */
    marginHorizontal: "7%",
  },
  swipeContainer: {
    width: "100%",
    marginBottom: 10,
  },
  firstRow: { flexDirection: "row" },
  checkboxCont: {
    alignItems: "baseline",
  },
  TaskCardText: {
    color: "black",
    paddingLeft: 5,
  },
  tagContainer: {
    marginTop: 10,
    marginLeft: 20,
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
