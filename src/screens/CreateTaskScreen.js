import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import CreateField from "../components/CreateField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors, icons } from "../../constants/vars";
import ScreenHeader from "../components/ScreenHeader";
import ToggleInput from "../components/ToggleInput";
import Font from "../components/Font";
import { fonts } from "../../constants/fonts";
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addTaskToList, editTask } from "../../redux/actions/TaskListActions";
import DateService from "../services/DateService";

const CreateTaskScreen = ({ navigation, route }) => {
  Moment.locale("en");
  const dispatch = useDispatch();
  const taskLists = useSelector((state) => state.taskLists);
  const goals = useSelector((state) => state.goals);
  const sharedGoals = useSelector((state) => state.sharedGoals);
  const routeParams = route.params;

  const [date, setDate] = useState(new Date());

  const [assignedList, setAssignedList] = useState();
  const [assignedGoal, setAssignedGoal] = useState("None");
  const [assignedTaskEdit, setAssignedTaskEdit] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [toggleModal, setToggleModal] = useState();
  const [toggleRender, setToggleRender] = useState(false);

  const inputRef = React.createRef();

  useEffect(() => {
    if (routeParams?.listName) {
      setAssignedList(routeParams?.listName);
      if (routeParams?.task) {
        setAssignedTaskEdit(routeParams.task);
        /* setName(routeParams.task.name); */
        setDate(routeParams.task.deadline);
        setDescription(routeParams.task.description);
      } else {
        setAssignedTaskEdit();
        setDate(new Date());
        setDescription("");
      }
    } else {
      setAssignedList(taskLists[0].name);
      setAssignedGoal("None");
    }
  }, [routeParams]);

  const now = new Date();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleToggleModal = (selector) => {
    setToggleModal(selector);
  };

  const handleAddTask = () => {
    let listId;
    let listDeadline;
    let listLength = 0;

    for (let list of taskLists) {
      if (assignedList === list.name) {
        listId = list.key;
        listDeadline = list.deadline;
        for (let task in list.tasks) {
          listLength++;
        }
      }
    }
    let goalId = null;
    for (let goal of goals) {
      if (assignedGoal === goal.name) {
        goalId = goal.key;
      }
    }
    for (let goal of sharedGoals) {
      if (assignedGoal === goal.name) {
        goalId = goal.key;
      }
    }
    const task = {
      name: name,
      description: description,
      deadline: date,
      date_created: now,
      listId: listId,
      goalId: goalId,
      added_value: value,
    };
    if (!assignedTaskEdit) {
      dispatch(addTaskToList(task, listDeadline, listLength));
    } else {
      dispatch(editTask(assignedTaskEdit.key, task));
      setAssignedTaskEdit(null);
    }
    setName("");
    setDescription("");
    setToggleRender(!toggleRender);
    inputRef.current.clear();
    !routeParams?.hideBackArrow ? navigation.goBack() : null;
  };

  const resetInputs = () => {};

  const renderTaskListPicker = (list, index) => {
    return <Picker.Item key={index} label={list.name} value={list.name} />;
  };
  const renderGoalPicker = (goal, index) => {
    return <Picker.Item key={index} label={goal.name} value={goal.name} />;
  };
  return (
    <ScrollView contentContainerStyle={styles.CreateTaskScreen}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        contentContainerStyle={styles.Content}
      >
        <ScreenHeader
          title={assignedTaskEdit ? "Edit task" : "Create a Task"}
          navigation={navigation}
          hideBackArrow={routeParams?.hideBackArrow}
        />
        <CreateField
          src={icons.alphabet}
          placeholder={
            assignedTaskEdit ? assignedTaskEdit.name : "Declare a name"
          }
          value={assignedTaskEdit ? assignedTaskEdit.name : ""}
          title="Name"
          textChanged={(text) => {
            setName(text);
          }}
          toggleRender={toggleRender}
        />
        <ToggleInput
          title="Due date"
          icon={icons.calender}
          value={
            assignedTaskEdit
              ? DateService.formatDate(assignedTaskEdit.deadline)
              : DateService.formatDate(date)
          }
          handleOnPress={() => handleToggleModal("date")}
        />
        <ToggleInput
          title="Assign to a list"
          icon={icons.list}
          value={assignedList}
          handleOnPress={() => handleToggleModal("list")}
        />
        <ToggleInput
          title="Assign to a goal (optional)"
          icon={icons.target}
          value={assignedGoal}
          handleOnPress={() => handleToggleModal("goal")}
        />
        {assignedGoal !== "None" ? (
          <View style={styles.goalValueContainer}>
            <CreateField
              src={icons.none}
              placeholder="Enter a value"
              title="Value"
              textChanged={(text) => {
                setValue(text);
              }}
              toggleRender={toggleRender}
            />
          </View>
        ) : null}
        <Text style={[fonts.heading5, styles.descriptionText]}>
          <Font text="Description:"></Font>
        </Text>
        <TextInput
          ref={inputRef}
          returnKeyType="done"
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={4}
          placeholder="Add descripion..."
          defaultValue={assignedTaskEdit ? assignedTaskEdit.description : ""}
          style={styles.description}
        />
        <View style={styles.buttonContainer}>
          {assignedTaskEdit ? (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setAssignedTaskEdit(null);
              }}
            >
              <Text style={[fonts.heading3, styles.cancelButtonText]}>
                <Font text="Cancel"></Font>
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}

          <TouchableOpacity
            disabled={name != "" ? false : true}
            style={[
              styles.addButton,
              {
                backgroundColor: name != "" ? colors.purple : colors.gray + 30,
              },
            ]}
            onPress={() => handleAddTask()}
          >
            <Text style={[fonts.heading3, styles.addButtonText]}>
              <Font
                text={assignedTaskEdit ? "Confirm changes" : "Add Task"}
              ></Font>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <Modal
        presentationStyle="overFullScreen"
        transparent={true}
        animationType="fade"
        style={styles.modalBackground}
        visible={toggleModal === "date"}
        onRequestClose={() => {
          setToggleModal("");
        }}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => {
            setToggleModal("");
          }}
        >
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              maximumDate={
                new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
              }
              minimumDate={now}
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        presentationStyle="overFullScreen"
        transparent={true}
        animationType="fade"
        style={styles.modalBackground}
        visible={toggleModal === "list"}
        onRequestClose={() => {
          setToggleModal("");
        }}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => {
            setToggleModal("");
          }}
        >
          <View style={styles.datePickerContainer}>
            <Pressable>
              <Picker
                selectedValue={assignedList}
                onValueChange={(itemValue, itemIndex) =>
                  setAssignedList(itemValue)
                }
              >
                {Object.values(taskLists).map((list, index) => {
                  return renderTaskListPicker(list, index);
                })}
              </Picker>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        presentationStyle="overFullScreen"
        transparent={true}
        animationType="fade"
        style={styles.modalBackground}
        visible={toggleModal === "goal"}
        onRequestClose={() => {
          setToggleModal("");
        }}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => {
            setToggleModal("");
          }}
        >
          <View style={styles.datePickerContainer}>
            <Pressable>
              <Picker
                selectedValue={assignedGoal}
                onValueChange={(itemValue, itemIndex) =>
                  setAssignedGoal(itemValue)
                }
              >
                <Picker.Item label={"None"} value={"None"} />
                {Object.values(goals).map((goal, index) => {
                  return renderGoalPicker(goal, index);
                })}
                {Object.values(sharedGoals).map((goal, index) => {
                  return renderGoalPicker(goal, index);
                })}
              </Picker>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default CreateTaskScreen;

const styles = StyleSheet.create({
  CreateTaskScreen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  Content: {
    alignItems: "center",
  },
  descriptionText: {
    fontWeight: "900",
    width: "90%",
    marginBottom: 5,
  },
  description: {
    padding: 10,
    height: 150,
    width: "90%",
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 10,
  },
  datePickerContainer: {
    alignSelf: "center",
    width: "80%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: colors.black + "90",
    position: "absolute",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    height: 50,
  },
  cancelButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 50,
    borderColor: colors.purple,
    borderWidth: 1,
    marginLeft: 40,
  },
  addButton: {
    padding: 10,
    paddingHorizontal: 20,

    borderRadius: 50,
    position: "absolute",
    right: 40,
  },
  cancelButtonText: {
    color: colors.purple,
  },
  addButtonText: {
    color: colors.white,
  },
});
