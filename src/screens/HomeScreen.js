import React, { useEffect } from "react";
import { View, Button, Text, SafeAreaView, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import { useSelector, useDispatch, useStore } from "react-redux";
import {
  addTaskList,
  addTaskToList,
} from "../../redux/actions/TaskListActions";
require("firebase/auth");

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const taskLists = useSelector((state) => state.taskLists);

  const onSignoutPress = () => {
    firebase.auth().signOut().then(navigation.navigate("Login"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Signed in as: {currentUser?.email}</Text>
      <Button title="Log out" onPress={() => onSignoutPress()}></Button>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
