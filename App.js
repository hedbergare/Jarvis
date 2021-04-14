import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import ApiKeys from "./constants/ApiKeys";
import firebase from "firebase/app";
import { createStackNavigator } from "@react-navigation/stack";
import ExampleScreen from "./src/screens/ExampleScreen/ExampleScreen";
import OtherExampleScreen from "./src/screens/OtherExampleScreen/OtherExampleScreen";

const Stack = createStackNavigator();

const App = () => {
  //Initializing firebase
  if (!firebase.apps.length) {
    console.log("Firebase initialized");
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Example"
          component={ExampleScreen}
          options={{ title: "Example screen" }}
        />
        <Stack.Screen
          name="OtherExample"
          component={OtherExampleScreen}
          options={{ title: "OtherExample screen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
