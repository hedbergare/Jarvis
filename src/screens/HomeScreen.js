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

  const onSignoutPress = () => {
    firebase.auth().signOut();
  };
  const test = false;

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="Log out" onPress={() => onSignoutPress()}></Button>
    </View>
  );
  // return <View styles={styles.container}>{currentUser ? <></> : <></>}</View>;
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
