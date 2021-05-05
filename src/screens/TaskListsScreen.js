import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import ScreenHeader from "../components/ScreenHeader";
import TaskListCard from "../components/TaskListCard";

const TaskListsScreen = ({ navigation }) => {
  const [displayOwned, setDisplayOwned] = React.useState(true);
  const handleDisplayOwned = () => {
    setDisplayOwned(true);
  };
  const handleDisplayShared = () => {
    setDisplayOwned(false);
  };
  const handleOnPressTaskList = () => {
    navigation.navigate("ViewTaskListScreen");
  };
  const renderTasklists = () => {
    return (
      <TaskListCard
        name="General"
        completed={10}
        total={15}
        onPressHandler={() => handleOnPressTaskList}
      />
    );
  };
  return (
    <View style={styles.TaskListsScreen}>
      <ScreenHeader title="Task lists" navigation={navigation} />
      <View style={styles.listTypeToggle}>
        <TouchableOpacity
          style={displayOwned ? styles.activeListStyle : null}
          onPress={handleDisplayOwned}
        >
          <Text
            style={[
              fonts.heading4,
              styles.listTypeText,
              displayOwned ? null : styles.fadedText,
            ]}
          >
            Mine
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={displayOwned ? null : styles.activeListStyle}
          onPress={handleDisplayShared}
        >
          <Text
            style={[
              fonts.heading4,
              styles.listTypeText,
              displayOwned ? styles.fadedText : null,
            ]}
          >
            Shared
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.taskListsContainer}>{renderTasklists()}</View>
    </View>
  );
};

export default TaskListsScreen;

const styles = StyleSheet.create({
  TaskListsScreen: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  listTypeToggle: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  listTypeText: {
    width: 140,
    textAlign: "center",
    marginBottom: 10,
  },
  activeListStyle: {
    opacity: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.purple,
  },
  fadedText: {
    opacity: 0.5,
  },
  taskListsContainer: {
    marginTop: 20,
  },
});
