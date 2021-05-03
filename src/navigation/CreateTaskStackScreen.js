import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateTaskScreen from "../screens/CreateTaskScreen";

const CreateTaskStackScreen = () => {
  const CreateTaskStack = createStackNavigator();

  return (
    <CreateTaskStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CreateTaskStack.Screen
        name="CreateTaskScreen"
        component={CreateTaskScreen}
      />
    </CreateTaskStack.Navigator>
  );
};

export default CreateTaskStackScreen;

const styles = StyleSheet.create({});
