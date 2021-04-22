import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ApiKeys from "./constants/ApiKeys";
import firebase from "firebase/app";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import TaskListsScreen from "./src/screens/TaskListsScreen";

const App = () => {
  //Initializing firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
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
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ title: "Loading screen" }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "Login screen" }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: "Registration screen" }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home screen" }}
        />
        <Stack.Screen
          name="TaskListsScreen"
          component={TaskListsScreen}
          options={{ title: "Task lists screen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
