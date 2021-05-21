import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import SettingsScreen from "../screens/SettingsScreen";

const CreateTaskStackScreen = ({ navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      // Prevent default behavior
      e.preventDefault();

      navigation.navigate("CreateTaskScreen", {
        task: null,
        hideBackArrow: true,
      });
    });

    return unsubscribe;
  }, [navigation]);
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

      <CreateTaskStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </CreateTaskStack.Navigator>
  );
};

export default CreateTaskStackScreen;

const styles = StyleSheet.create({});
