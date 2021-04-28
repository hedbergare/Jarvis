import { useSelector, useDispatch, useStore } from "react-redux";
import {
  addTaskList,
  addTaskToList,
  shareTask,
  shareTaskList,
} from "../../redux/actions/TaskListActions";
import React from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import firebase from "firebase/app";
import "firebase/database";

import Navbar from "../components/Navbar";
import DisplayField from "../components/DisplayField";
import { fonts } from "../../constants/fonts";
import Font from "../components/Font";
import EditButton from "../components/EditButton";
import { fetchSharedTaskLists } from "../../redux/actions/SharedTaskListActions";
import { fetchSharedGoals } from "../../redux/actions/SharedGoalActions";
import { clockRunning } from "react-native-reanimated";

require("firebase/auth");

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const taskLists = useSelector((state) => state.taskLists);
  const sharedTaskLists = useSelector((state) => state.sharedTaskLists);
  const sharedGoals = useSelector((state) => state.sharedGoals);

  /* if (taskLists !== null) {
    for (const taskList of taskLists) {
      console.log(taskList);
      console.log(taskList.name);
    }
  } */
  const onSignoutPress = () => {
    firebase.auth().signOut().then(navigation.navigate("LoginScreen"));
  };
  if (currentUser) {
    return (
      <View style={styles.container}>
        <Button title="Log out" onPress={() => onSignoutPress()}></Button>
        <Navbar navigation={navigation} />
        <Text>You are logged in as: {currentUser.email}</Text>
        <Button
          title="Fetch shared task lists"
          onPress={() =>
            dispatch(fetchSharedTaskLists(firebase.auth().currentUser.uid))
          }
        ></Button>
        <Button
          title="Share task list with user"
          onPress={() =>
            dispatch(
              shareTaskList(
                "-MYsp3uNxyrFKN4ubVUM",
                "4IRSqCL9eCTE9Y6QwQq1vAD2sYk2"
              )
            )
          }
        ></Button>
      </View>
    );
  } else {
    return <View style={styles.container}></View>;
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionContainer: {
    width: "90%",
  },
  descriptionText: {
    padding: 10,
  },
});
