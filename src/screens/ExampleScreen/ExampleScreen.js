import React from "react";
import { Button, Text, SafeAreaView } from "react-native";
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
