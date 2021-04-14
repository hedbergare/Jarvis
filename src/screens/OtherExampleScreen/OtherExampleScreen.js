import React from "react";
import { Button, SafeAreaView, Text } from "react-native";

const OtherExampleScreen = ({ navigation }) => {
  const exampleFunction = () => {};

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
