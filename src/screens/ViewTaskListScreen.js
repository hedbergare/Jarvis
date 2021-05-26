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
import Sort from "../components/Sort";
import SortingService from "../services/SortingService";

const ViewTaskListScreen = ({ navigation, route }) => {
  const listKey = route.params;
  const [sortedList, setSortedList] = useState([]);

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
    navigation.navigate("TaskScreen", { task, list });
  };

  const dispatch = useDispatch();

  const handleOnDeleteTask = (task) => {
    dispatch(deleteTask(list.key, task.key));
  };
  const handleOnEditTask = (task) => {
    navigation.navigate("CreateTaskStackScreen", {
      screen: "CreateTaskScreen",
      params: { listName: list.name, task: task, hideBackArrow: false },
    });
  };
  const renderTaskCards = (task, index) => {
    return (
      <TaskCard
        key={index}
        task={task}
        list={list}
        handleOnPress={(task) => handleOnPressTaskCard(task, list)}
        handleDelete={(task) => handleOnDeleteTask(task)}
        handleEdit={(task) => handleOnEditTask(task)}
      />
    );
  };

  const handleSortedList = (sortBy) => {
    console.log(sortBy);
    let sortedList;
    switch (sortBy) {
      case "Due date":
        sortedList = SortingService.sortByDueDate(list.tasks, true);
        break;
      case "Newest":
        sortedList = SortingService.sortByNewest(list.tasks, true);
        break;
      case "Oldest":
        sortedList = SortingService.sortByOldest(list.tasks, true);
        break;
      default:
    }
    // console.log("SORTING LIST: ", sortedList);
    setSortedList(sortedList);
  };

  return (
    <View style={styles.ViewTaskListScreen}>
      <ScrollView>
        <ScreenHeader title={list.name} navigation={navigation} />
        <View style={styles.sortContainer}>
          <Sort
            selectedChoice="Due date"
            listToSort={list.tasks}
            handleOnPress={(sortedBy) => handleSortedList(sortedBy)}
          />
        </View>
        <View style={styles.listContainer}>
          {list.tasks ? (
            Object.values(sortedList)?.map((task, index) => {
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
        </View>
      </ScrollView>
      <AddButton
        handleOnPress={() => {
          navigation.navigate("CreateTaskStackScreen", {
            screen: "CreateTaskScreen",
            params: { listName: list.name, task: null, hideBackArrow: false },
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
  listContainer: {
    zIndex: -1,
  },
  sortContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
