import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { fonts } from "../../constants/fonts";
import { colors, icons } from "../../constants/vars";
import ScreenHeader from "../components/ScreenHeader";
import TaskListCard from "../components/TaskListCard";
import { useSelector, useDispatch } from "react-redux";
import AddButton from "../components/AddButton";
import FullScreenModal from "../components/FullScreenModal";
import CreateField from "../components/CreateField";
import {
  addTaskList,
  deleteTaskList,
  submitEditTaskList,
} from "../../redux/actions/TaskListActions";
import ShareWithPicker from "../components/ShareWithPicker";

const TaskListsScreen = ({ navigation }) => {
  const [displayOwned, setDisplayOwned] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [editList, setEditList] = useState(null);

  const [shareWith, setShareWith] = React.useState([]);
  const [editShareWith, setEditShareWith] = React.useState([]);

  const handleOnShareWith = (id) => {
    shareWith.push(id);
  };
  const handleRemoveShareWith = (id) => {
    shareWith.splice(shareWith.indexOf(id), 1);
  };
  const handleOnEditShareWith = (id) => {
    editShareWith.push(id);
  };
  const handleEditRemoveShareWith = (id) => {
    editShareWith.splice(shareWith.indexOf(id), 1);
  };
  const dispatch = useDispatch();
  const taskLists = useSelector((state) => state.taskLists);
  const userId = useSelector((state) => state.currentUser.uid);

  const { sharedTaskLists } = useSelector((state) => state.sharedTaskLists);

  const handleDisplayOwned = () => {
    setDisplayOwned(true);
  };

  const handleDisplayShared = () => {
    setDisplayOwned(false);
  };

  const handleOnPressTaskList = (list) => {
    navigation.navigate("ViewTaskListScreen", list.key);
  };

  const handleCreateTaskList = () => {
    dispatch(addTaskList(userId, name, shareWith));
    setShowAddModal(false);
  };
  const handleOnDeleteTaskList = (list) => {
    dispatch(deleteTaskList(list.key));
  };

  const handleOnEditTaskList = (list) => {
    setEditList(list);
    if (list.shared_with) {
      for (let user in list.shared_with) {
        editShareWith.push(user);
      }
    }
    setShowEditModal(true);
  };
  const handleSubmitChanges = () => {
    dispatch(submitEditTaskList(editName, editList.key, editShareWith));
    setEditName("");
    setEditList(null);
    setShowEditModal(false);
    setEditShareWith([]);
  };
  const renderTasklist = (list, index, swipeable = true) => {
    return (
      <TaskListCard
        key={index}
        list={list}
        onPressHandler={(list) => handleOnPressTaskList(list)}
        handleDelete={(list) => handleOnDeleteTaskList(list)}
        handleEdit={(list) => handleOnEditTaskList(list)}
        swipeable={swipeable}
      />
    );
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.TaskListsScreen}>
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
        <View style={styles.taskListContainer}>
          {displayOwned
            ? Object.values(taskLists).map((list, index) => {
                return renderTasklist(list, index);
              })
            : Object.values(sharedTaskLists).map((list, index) => {
                return renderTasklist(list, index, false);
              })}
        </View>

        {showAddModal && (
          <FullScreenModal
            confirmText="Create list"
            title="Create Task List"
            visible={showAddModal}
            handleClose={() => {
              setShowAddModal(false);
            }}
            handleConfirm={() => handleCreateTaskList()}
            content={
              <>
                <CreateField
                  src={icons.alphabet}
                  placeholder="Declare a name"
                  title="Name"
                  textChanged={(text) => setName(text)}
                />
                <ShareWithPicker
                  handleOnShareWith={(id) => handleOnShareWith(id)}
                  handleRemoveShareWith={(id) => handleRemoveShareWith(id)}
                ></ShareWithPicker>
              </>
            }
          />
        )}
        {showEditModal && (
          <FullScreenModal
            confirmText="Submit changes"
            title="Edit Task List"
            visible={showEditModal}
            handleClose={() => {
              setShowEditModal(false);
            }}
            handleConfirm={() => handleSubmitChanges()}
            content={
              <>
                <CreateField
                  src={icons.alphabet}
                  placeholder={editList.name}
                  title="Name"
                  textChanged={(text) => setEditName(text)}
                />
                <ShareWithPicker
                  handleOnShareWith={(id) => handleOnEditShareWith(id)}
                  handleRemoveShareWith={(id) => handleEditRemoveShareWith(id)}
                  alreadyShared={editList.shared_with}
                ></ShareWithPicker>
              </>
            }
          />
        )}
      </ScrollView>
      <AddButton
        handleOnPress={() => {
          setShowAddModal(true);
        }}
      />
    </>
  );
};

export default TaskListsScreen;

const styles = StyleSheet.create({
  TaskListsScreen: {
    backgroundColor: colors.white,
    alignItems: "center",
    minHeight: "100%",
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
  taskListContainer: {
    marginTop: 10,
  },
});
