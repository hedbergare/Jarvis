import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/vars";
import ScreenHeader from "../components/ScreenHeader";
import TaskCard from "../components/TaskCard";

const ViewTaskListScreen = ({ navigation }) => {
  const handleOnPressTaskCard = () => {
    navigation.navigate("TaskScreen");
  };
  const renderTaskCards = () => {
    return (
      <>
        <TaskCard handleOnPress={() => handleOnPressTaskCard()} />
        <TaskCard />
        <TaskCard />
      </>
    );
  };
  return (
    <View style={styles.ViewTaskListScreen}>
      <ScreenHeader title="Task List" navigation={navigation} />
      {renderTaskCards()}
    </View>
  );
};

export default ViewTaskListScreen;

const styles = StyleSheet.create({
  ViewTaskListScreen: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
