import React from "react";
import { Image, Button, SafeAreaView, StyleSheet, View } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import ScreenHeader from "../components/ScreenHeader";
import TaskCard from "../components/TaskCard";
require("firebase/auth");

const HomeScreen = ({ navigation }) => {
  const onSignoutPress = () => {
    firebase.auth().signOut().then(navigation.navigate("Login"));
  };

  return (
    <View style={styles.container}>
      <ScreenHeader />
      <TaskCard />
      {/* <Button title="Log out" onPress={() => onSignoutPress()}></Button> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#fff",
  },
});
