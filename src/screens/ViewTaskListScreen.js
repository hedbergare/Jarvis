import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { colors, icons } from "../../constants/vars";
import AddButton from "../components/AddButton";
import ScreenHeader from "../components/ScreenHeader";
import { useDispatch, useSelector } from "react-redux";

import TaskCard from "../components/TaskCard";
import { deleteTask } from "../../redux/actions/TaskListActions";
import FullScreenModal from "../components/FullScreenModal";
import CreateField from "../components/CreateField";
import Font from "../components/Font";
import { fonts } from "../../constants/fonts";

const ViewTaskListScreen = ({ navigation, route }) => {
  const listKey = route.params;

  const fetchCurrentList = () => {
    const taskLists = useSelector((state) => state.taskLists);
    const { sharedTaskLists } = useSelector((state) => state.sharedTaskLists);

    let currentList;
    for (const item of taskLists) {
      item.key === listKey ? (currentList = item) : null;
    }
    for (const item of sharedTaskLists) {
      item.key === listKey ? (currentList = item) : null;
    }
    return currentList;
  };

  const list = fetchCurrentList();

  const handleOnPressTaskCard = (task) => {
    navigation.navigate("TaskScreen", task);
  };

  const dispatch = useDispatch();

  const handleOnDeleteTask = (task) => {
    dispatch(deleteTask(list.key, task.key));
  };
  const handleOnEditTask = (task) => {
    navigation.navigate("CreateTaskStackScreen", {
      screen: "CreateTaskScreen",
      params: { listName: list.name, task: task },
    });
  };
  const renderTaskCards = (task, index) => {
    return (
      <TaskCard
        key={index}
        task={task}
        list={list}
        handleOnPress={(task) => handleOnPressTaskCard(task)}
        handleDelete={(task) => handleOnDeleteTask(task)}
        handleEdit={(task) => handleOnEditTask(task)}
      />
    );
  };

  return (
    <View style={styles.ViewTaskListScreen}>
      <ScrollView>
        <ScreenHeader title={list.name} navigation={navigation} />
        {list.tasks ? (
          Object.values(list.tasks).map((task, index) => {
            return renderTaskCards(task, index);
          })
        ) : (
          <View style={styles.noItemsText}>
            <Font
              textStyle={fonts.heading5}
              text="Add your first item below!"
            ></Font>
          </View>
        )}
      </ScrollView>
      <AddButton
        handleOnPress={() => {
          navigation.navigate("CreateTaskStackScreen", {
            screen: "CreateTaskScreen",
            params: { listName: list.name, task: null },
          });
        }}
      />
    </View>
  );
};

export default ViewTaskListScreen;

const styles = StyleSheet.create({
  ViewTaskListScreen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  noItemsText: {
    width: "60%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
