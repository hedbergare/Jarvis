import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";
import { fonts } from "../../constants/fonts";
import { colors, icons } from "../../constants/vars";
import ScreenHeader from "../components/ScreenHeader";
import TaskListCard from "../components/TaskListCard";
import { useSelector, useStore } from "react-redux";
import AddButton from "../components/AddButton";
import FullScreenModal from "../components/FullScreenModal";
import CreateField from "../components/CreateField";

const TaskListsScreen = ({ navigation }) => {
  const [displayOwned, setDisplayOwned] = React.useState(true);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const taskLists = useSelector((state) => state.taskLists);
  const { sharedTaskLists } = useSelector((state) => state.sharedTaskLists);

  const handleDisplayOwned = () => {
    setDisplayOwned(true);
  };

  const handleDisplayShared = () => {
    setDisplayOwned(false);
  };

  const handleOnPressTaskList = (list) => {
    navigation.navigate("ViewTaskListScreen", list);
  };

  const renderTasklist = (list, index) => {
    return (
      <TaskListCard
        key={index}
        list={list}
        onPressHandler={(list) => handleOnPressTaskList(list)}
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
      <View style={styles.taskListsContainer}>
        {displayOwned
          ? Object.values(taskLists).map((list, index) => {
              return renderTasklist(list, index);
            })
          : Object.values(sharedTaskLists).map((list, index) => {
              return renderTasklist(list, index);
            })}
      </View>

      <AddButton
        handleOnPress={() => {
          setShowAddModal(true);
        }}
      />
      {showAddModal && (
        <FullScreenModal
          title="Create Task List"
          visible={showAddModal}
          handleClose={() => {
            setShowAddModal(false);
          }}
          content={
            <CreateField
              src={icons.alphabet}
              placeholder="Declare a name"
              title="Name"
            />
          }
        />
      )}
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
