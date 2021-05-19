import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TaskListsScreen from "../screens/TaskListsScreen";
import ViewTaskListScreen from "../screens/ViewTaskListScreen";
import TaskScreen from "../screens/TaskScreen";
import SettingsScreen from "../screens/SettingsScreen";

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
      <TaskStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </TaskStack.Navigator>
  );
};

export default TaskStackScreen;

const styles = StyleSheet.create({});
