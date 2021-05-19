import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const AuthUserStackScreen = () => {
  const AuthUserStack = createStackNavigator();
  return (
    <AuthUserStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthUserStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthUserStack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
      <AuthUserStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </AuthUserStack.Navigator>
  );
};

export default AuthUserStackScreen;

const styles = StyleSheet.create({});
