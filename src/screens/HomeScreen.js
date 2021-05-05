import { useSelector, useDispatch, useStore } from "react-redux";
import React from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import firebase from "firebase/app";
import "firebase/database";

require("firebase/auth");

const HomeScreen = ({ navigation }) => {
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
