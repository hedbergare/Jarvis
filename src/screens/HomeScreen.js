import { useSelector, useDispatch, useStore } from "react-redux";
import React from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import firebase from "firebase/app";
import "firebase/database";

import Navbar from "../components/Navbar";
require("firebase/auth");

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const taskLists = useSelector((state) => state.taskLists);

  const onSignoutPress = () => {
    firebase.auth().signOut().then(navigation.navigate("LoginScreen"));
  };
  if (currentUser) {
    return (
      <View style={styles.container}>
        <Button title="Log out" onPress={() => onSignoutPress()}></Button>
        <Navbar navigation={navigation} />
        <Text>You are logged in as: {currentUser.email}</Text>
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
  },
});
