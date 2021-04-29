import { useSelector, useDispatch, useStore } from "react-redux";
import {
  addTaskList,
  addTaskToList,
} from "../../redux/actions/TaskListActions";
import React from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import firebase from "firebase/app";
import "firebase/database";

import DisplayField from "../components/DisplayField";
import { fonts } from "../../constants/fonts";
import Font from "../components/Font";
import EditButton from "../components/EditButton";
require("firebase/auth");

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const taskLists = useSelector((state) => state.taskLists);

  const onSignoutPress = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="Log out" onPress={() => onSignoutPress()}></Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
