import React from "react";
import { Button, Text, SafeAreaView, StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
