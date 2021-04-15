import React from "react";
import { Button, Text, SafeAreaView, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

const HomeScreen = ({ navigation }) => {
  const onSignoutPress = () => {
    firebase.auth().signOut().then(navigation.navigate("Login"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
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
