import React from "react";
import { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    checkIfLoggedIn();
  });
  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });
  };
  return (
    <SafeAreaView>
      <Text>Loading Logo Placeholder</Text>
    </SafeAreaView>
  );
};

export default LoadingScreen;
