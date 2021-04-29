import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import TaskListsScreen from "../screens/TaskListsScreen";
import ViewTaskListScreen from "../screens/ViewTaskListScreen";
import TaskScreen from "../screens/TaskScreen";

const TaskStackScreen = () => {
  const TaskStack = createStackNavigator();

  return (
    <TaskStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TaskStack.Screen name="TaskListsScreen" component={TaskListsScreen} />
      <TaskStack.Screen
        name="ViewTaskListScreen"
        component={ViewTaskListScreen}
      />
      <TaskStack.Screen name="TaskScreen" component={TaskScreen} />
    </TaskStack.Navigator>
  );
};

export default TaskStackScreen;

const styles = StyleSheet.create({});
