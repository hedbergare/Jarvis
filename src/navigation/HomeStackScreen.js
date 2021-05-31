import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";

const HomeStackScreen = () => {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="GoalsScreen" component={HomeScreen} />
      <HomeStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <HomeStack.Screen name="CreateTaskScreen" component={CreateTaskScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;

const styles = StyleSheet.create({});
