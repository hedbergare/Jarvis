import React from "react";
import { Button, Text, SafeAreaView } from "react-native";
/* import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; */
import styles from "./styles.js";

const ExampleScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is ExampleScreen</Text>
      <Button
        title="Go to OtherExample   "
        onPress={() => navigation.navigate("OtherExample")}
      />
    </SafeAreaView>
  );
};

export default ExampleScreen;
