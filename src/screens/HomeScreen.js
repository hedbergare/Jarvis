import React from "react";
import { Button, StyleSheet, View } from "react-native";
import firebase from "firebase/app";
import "firebase/database";

import Navbar from "../components/Navbar";
require("firebase/auth");

const HomeScreen = ({ navigation }) => {
  const onSignoutPress = () => {
    firebase.auth().signOut().then(navigation.navigate("LoginScreen"));
  };

  return (
    <View style={styles.container}>
      <Button title="Log out" onPress={() => onSignoutPress()}></Button>
      <Navbar navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
