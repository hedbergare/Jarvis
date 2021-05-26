import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import GoalsScreen from "../screens/GoalsScreen";
import ViewGoalScreen from "../screens/ViewGoalScreen";
import CreateGoalScreen from "../screens/CreateGoalScreen";
import SettingsScreen from "../screens/SettingsScreen";

const GoalStackScreen = () => {
  const GoalStack = createStackNavigator();

  return (
    <GoalStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <GoalStack.Screen name="GoalsScreen" component={GoalsScreen} />
      <GoalStack.Screen name="ViewGoalScreen" component={ViewGoalScreen} />
      <GoalStack.Screen name="CreateGoalScreen" component={CreateGoalScreen} />
      <GoalStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </GoalStack.Navigator>
  );
};

export default GoalStackScreen;

const styles = StyleSheet.create({});
