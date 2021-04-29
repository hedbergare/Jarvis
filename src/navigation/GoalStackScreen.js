import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GoalStackScreen = () => {
  return (
    <View style={styles.GoalStackScreen}>
      <Text>Goal stack</Text>
    </View>
  );
};

export default GoalStackScreen;

const styles = StyleSheet.create({
  GoalStackScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
