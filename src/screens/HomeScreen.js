import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { fonts } from "../../constants/fonts";
import { colors, icons } from "../../constants/vars";
import Font from "../components/Font";
import { useSelector, useStore, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import SvgComponent from "../components/SvgComponent";
import TaskCard from "../components/TaskCard";

import DateService from "../services/DateService";
import SortingService from "../services/SortingService";
import ConfirmButton from "../components/ConfirmButton";

const HomeScreen = ({ navigation }) => {
  const taskLists = useSelector((state) => state.taskLists);
  const [allUserTasks, setallUserTasks] = useState(
    SortingService.fetchAllUserTasks(taskLists)
  );

  const handleOnPressTaskCard = (task, list) => {
    console.log("task:", task);
    navigation.navigate("TaskScreen", { task, list });
  };

  const renderTaskCards = (task, index) => {
    return (
      <TaskCard
        key={index}
        task={task}
        list={task.list}
        handleOnPress={(task) => handleOnPressTaskCard(task, task.list)}
        handleDelete={(task) => handleOnDeleteTask(task)}
        handleEdit={(task) => handleOnEditTask(task)}
        fromHomeScreen={true}
      />
    );
  };

  useEffect(() => {
    setallUserTasks(SortingService.fetchAllUserTasks(taskLists));
  }, [taskLists]);
  return (
    <ScrollView contentContainerStyle={styles.HomeScreen}>
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
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        <Ionicons name="settings-outline" color={colors.whiteDark} size={32} />
      </TouchableOpacity>

      <View style={styles.tasksContainer}>
        <Font
          textStyle={{ marginLeft: 30, marginBottom: 20 }}
          text="Tasks:"
          font={fonts.heading1}
        ></Font>

        {taskLists
          ? Object.values(SortingService.sortByDueDate(allUserTasks)).map(
              (task, index) => {
                return index < 3 ? renderTaskCards(task, index) : null;
              }
            )
          : null}
        <View style={styles.confirmButton}>
          <ConfirmButton
            confirmText="Add New Task"
            handleConfirm={() => {
              navigation.navigate("CreateTaskStackScreen", {
                screen: "CreateTaskScreen",
                params: {
                  task: null,
                  hideBackArrow: false,
                },
              });
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  HomeScreen: {
    minHeight: "100%",
    //flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
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
