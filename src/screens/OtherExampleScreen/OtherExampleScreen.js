import React from "react";
import { Button, SafeAreaView, Text } from "react-native";
/* import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; */

const OtherExampleScreen = ({ navigation }) => {
  const exampleFunction = () => {
    console.log("test");
  };

  return (
    <SafeAreaView>
      <Text>This is OtherExampleScreen</Text>
      <Button
        title="Go back to ExampleScreen"
        onPress={() => navigation.navigate("Example")}
      />
    </SafeAreaView>
  );
};

export default OtherExampleScreen;
