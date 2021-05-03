import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CreateField from "../components/CreateField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../../constants/vars";
import ScreenHeader from "../components/ScreenHeader";
import PickDateCard from "../components/PickDateCard";

const CreateTaskScreen = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.CreateTaskScreen}
      scrollEnabled={true}
    >
      <ScreenHeader title="Create a Task" navigation={navigation} />

      <CreateField
        src={require("../assets/icon-alphabet.png")}
        placeholder="Declare a name"
        title="Name"
      />
      <PickDateCard />
    </KeyboardAwareScrollView>
  );
};

export default CreateTaskScreen;

const styles = StyleSheet.create({
  CreateTaskScreen: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
});
