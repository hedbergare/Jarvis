import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/vars";
import ScreenHeader from "../components/ScreenHeader";
import TaskCard from "../components/TaskCard";

const ViewTaskListScreen = ({ navigation, route }) => {
  const list = route.params;

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
      <ScreenHeader title={list.name} navigation={navigation} />
      {list.tasks ? (
        Object.values(list.tasks).map((task, index) => {
          return renderTaskCards(task, index);
        })
      ) : (
        /* TO DO - Add a "add task" button here */
        <Text>You don't have any tasks in this list yet. Add task here:</Text>
      )}
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
