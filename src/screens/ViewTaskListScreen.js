import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { colors } from "../../constants/vars";
import AddButton from "../components/AddButton";
import ScreenHeader from "../components/ScreenHeader";
import { useSelector } from "react-redux";

import TaskCard from "../components/TaskCard";

const ViewTaskListScreen = ({ navigation, route }) => {
  const listKey = route.params;

  const fetchCurrentList = () => {
    const taskLists = useSelector((state) => state.taskLists);
    let currentList;
    for (const item of taskLists) {
      item.key === listKey ? (currentList = item) : null;
    }
    return currentList;
  };

  const list = fetchCurrentList();

  const handleOnPressTaskCard = (task) => {
    navigation.navigate("TaskScreen", task);
  };
  const renderTaskCards = (task, index) => {
    return (
      <TaskCard
        key={index}
        task={task}
        list={list}
        handleOnPress={(task) => handleOnPressTaskCard(task)}
      />
    );
  };

  return (
    <View style={styles.ViewTaskListScreen}>
      <ScrollView>
        {/* <View style={styles.ViewTaskListScreen}> */}
        <ScreenHeader title={list.name} navigation={navigation} />
        {list.tasks ? (
          Object.values(list.tasks).map((task, index) => {
            return renderTaskCards(task, index);
          })
        ) : (
          /* TO DO - Add a "add task" button here */
          <Text>You don't have any tasks in this list yet. Add task here:</Text>
        )}
        {/* </View> */}
      </ScrollView>
      <AddButton
        handleOnPress={() => {
          navigation.navigate("CreateTaskStackScreen", {
            screen: "CreateTaskScreen",
            params: { listName: list.name },
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
});
