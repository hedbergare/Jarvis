import React from "react";
import { Image, Button, SafeAreaView, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
import ScreenHeader from "../components/ScreenHeader";
require("firebase/auth");

const HomeScreen = ({ navigation }) => {
  const onSignoutPress = () => {
    firebase.auth().signOut().then(navigation.navigate("Login"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader />
      {/* <Button title="Log out" onPress={() => onSignoutPress()}></Button> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
