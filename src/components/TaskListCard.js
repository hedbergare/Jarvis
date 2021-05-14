import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";
import Swipeable from "react-native-gesture-handler/Swipeable";
import SwipeButtons from "./SwipeButtons";
import { Ionicons } from "@expo/vector-icons";

const TaskListCard = ({ list, onPressHandler, handleDelete, handleEdit }) => {
  const swipeableRef = React.useRef(null);

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
    <>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={() => (
          <SwipeButtons
            onDeletePress={() => {
              handleDelete(list);
              swipeableRef.current.close();
            }}
            onEditPress={() => {
              handleEdit(list);
              swipeableRef.current.close();
            }}
          ></SwipeButtons>
        )}
        friction={2}
        rightThreshold={20}
        containerStyle={styles.swipeContainer}
      >
        <View style={styles.TaskListCard}>
          <TouchableOpacity
            style={styles.content}
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
                    textDecorationLine: list.completed
                      ? "line-through"
                      : "none",
                  },
                ]}
              >
                <Font text={list.name}></Font>
              </Text>
              <Text style={fonts.subText}>
                <Font text={completed + " out of " + total}></Font>
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              color={colors.black}
              size={40}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
      </Swipeable>
    </>
  );
};

export default TaskListCard;

const styles = StyleSheet.create({
  TaskListCard: {
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  content: {
    paddingBottom: 10,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    flexDirection: "row",
    width: "86%",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "7%",
    backgroundColor: colors.white,
  },
  swipeContainer: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: colors.black,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  textContainer: {
    width: "60%",
  },
  arrow: {
    right: 30,
  },
});
