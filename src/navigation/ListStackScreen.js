import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "../screens/ListScreen";
import ViewListScreen from "../screens/ViewListScreen";
import SettingsScreen from "../screens/SettingsScreen";

const ListStackScreen = () => {
  const TaskStack = createStackNavigator();

  return (
    <TaskStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TaskStack.Screen name="ListScreen" component={ListScreen} />
      <TaskStack.Screen name="ViewListScreen" component={ViewListScreen} />
      <TaskStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </TaskStack.Navigator>
  );
};

export default ListStackScreen;

const styles = StyleSheet.create({});
