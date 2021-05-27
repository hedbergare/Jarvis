import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FriendsScreen from "../screens/FriendsScreen";

const FriendsStackScreen = ({ navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      // Prevent default behavior
      e.preventDefault();

      navigation.navigate("FriendsScreen", {
        task: null,
        hideBackArrow: true,
      });
    });

    return unsubscribe;
  }, [navigation]);
  const FriendStack = createStackNavigator();

  return (
    <FriendStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <FriendStack.Screen name="FriendsScreen" component={FriendsScreen} />

      <FriendStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </FriendStack.Navigator>
  );
};

export default FriendsStackScreen;

const styles = StyleSheet.create({});
