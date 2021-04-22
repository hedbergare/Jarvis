import React from "react";
import { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/actions/AuthActions";
import { fetchTaskLists } from "../../redux/actions/TaskListActions";

const LoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfLoggedIn();
  });

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchUser(user.uid));
        dispatch(fetchTaskLists(user.uid));
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
