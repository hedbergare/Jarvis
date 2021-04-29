import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ListStackScreen = () => {
  return (
    <View style={styles.ListStackScreen}>
      <Text>List Stack</Text>
    </View>
  );
};

export default ListStackScreen;

const styles = StyleSheet.create({
  ListStackScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
