import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Navbar from "../components/Navbar";
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
  return (
    <View style={styles.TaskListsScreen}>
      <ScreenHeader />
      <Navbar navigation={navigation} />
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
      <TaskListCard />
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
});
