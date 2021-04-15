import React from "react";
import { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

const LoadingScreen = ({ navigation }) => {
  //Runs on render, same as componentDidMount() for classes
  useEffect(() => {
    checkIfLoggedIn();
  });
  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //The user is already logged in - redirect to Home Screen
        navigation.navigate("Home");
      } else {
        //The user is not logged in - redirect to Login Screen
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
