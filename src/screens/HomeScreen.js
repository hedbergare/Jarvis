import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors, icons } from "../../constants/vars";
import Font from "../components/Font";
import { useSelector, useStore, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import SvgComponent from "../components/SvgComponent";
import TaskCard from "../components/TaskCard";

import DateService from "../services/DateService";
import SortingService from "../services/SortingService";

const HomeScreen = ({ navigation }) => {
  const taskLists = useSelector((state) => state.taskLists);
  const [fetchAllUserTasks, setFetchAllUserTasks] = useState([]);

  const [urgentTasks, setUrgentTasks] = useState([]);

  const [urgentKeys, setUrgentKeys] = useState([]);
  const currentTasklists = () => {
    if (urgentKeys.length != 0) {
      let updatedTasks = [];
      for (const task of urgentKeys) {
        updatedTasks.push(
          SortingService.findTaskByKey(taskLists, task.taskKey, task.listKey)
        );
      }
      return updatedTasks;
      // setUrgentTasks(updatedTasks);
    }
  };
  const currentTasks = currentTasklists();
  useEffect(() => {
    setFetchAllUserTasks(SortingService.fetchAllUserTasks(taskLists));
  }, []);

  useEffect(() => {
    if (urgentKeys.length === 0 && fetchAllUserTasks.length > 0) {
      let tempList = [];
      let counter = 0;
      for (const fetchedTask of fetchAllUserTasks) {
        counter++;
        if (counter < 4) {
          tempList.push({
            taskKey: fetchedTask.key,
            listKey: fetchedTask.list.key,
          });
        }
      }
      setUrgentKeys(tempList);
    }
    // currentTasklists();
  }, [taskLists]);

  const renderTasklist = (task, index) => {
    return (
      <TaskCard
        key={index}
        task={task}
        list={task.list}
        // handleOnPress={(task) => handleOnPressTaskCard(task, list)}
        // handleDelete={(task) => handleOnDeleteTask(task)}
        // handleEdit={(task) => handleOnEditTask(task)}
      />
    );
  };

  return (
    <View style={styles.HomeScreen}>
      <View style={styles.homeScreenHeader}>
        <SvgComponent
          content={icons.homeScreenHeader}
          iconStyle={styles.screenHeaderSvg}
        />

        <View style={styles.nameContainer}>
          <Font
            text="Good Morning,"
            font={fonts.heading1Light}
            textStyle={styles.headerText}
          ></Font>
          <Font
            text={"Patrik"}
            font={fonts.heading1}
            textStyle={styles.headerText}
          ></Font>
          <Text style={[styles.date, fonts.subText]}>
            <Font text={DateService.formatDate(new Date())}></Font>
          </Text>
        </View>
        <View style={styles.logoContainer}>
          <SvgComponent content={icons.logo} iconStyle={styles.logo} />
        </View>
      </View>

      <Font text="Upcoming Tasks:" font={fonts.heading1}></Font>
      {urgentKeys && currentTasks
        ? Object.values(currentTasks).map((task, index) => {
            return renderTasklist(task, index);
          })
        : null}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  HomeScreen: {
    minHeight: "100%",
    backgroundColor: colors.white,
    alignItems: "center",
  },
  settingsIcon: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  logoContainer: {
    position: "absolute",
    bottom: 0,
    transform: [{ translateY: "-240%" }],

    justifyContent: "center",
    alignItems: "center",
  },
  logo: {},
  screenHeaderSvg: {
    transform: [{ translateY: -30 }],
    position: "absolute",
    top: 0,
    left: 0,
  },
  homeScreenHeader: {
    minWidth: "100%",
    height: 400,
    //550
    position: "relative",
    alignItems: "center",
  },
  date: {
    color: colors.green,
    transform: [{ translateY: -5 }],
  },
  nameContainer: {
    transform: [{ translateX: "30%" }, { translateY: "-110%" }],
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  headerText: {
    color: colors.white,
  },
  tasksContainer: {
    transform: [{ translateY: -40 }],
    width: "100%",
    height: 400,
    // overflow: "hidden",
    position: "relative",
  },
  confirmButton: {
    maxWidth: 170,
    marginTop: 20,
    alignSelf: "center",
  },
});
