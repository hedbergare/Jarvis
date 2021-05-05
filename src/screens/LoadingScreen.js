import React from "react";
import { SafeAreaView, Text } from "react-native";
import "firebase/database";
require("firebase/auth");

const LoadingScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Loading Logo Placeholder</Text>
    </SafeAreaView>
  );
};

export default LoadingScreen;
