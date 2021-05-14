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

  const [checkboxState, setCheckboxState] = React.useState(task.completed);
  const swipeableRef = React.useRef(null);

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
            {/* <Image
              style={styles.trashIcon}
              source={require("../assets/icon-delete-trash-can.png")}
            /> */}
          </View>
          <View style={styles.tagContainer}>{renderGoalTags()}</View>
        </View>
      </Swipeable>
    </>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  TaskCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  content: {
    flexDirection: "row",
    paddingBottom: 15,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    flexDirection: "row",
    width: "86%",
    alignItems: "center",
    marginHorizontal: "7%",
  },
  swipeContainer: {
    width: "100%",
    marginBottom: 10,
  },
  TaskCardText: {
    color: "black",
    paddingLeft: 5,
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
