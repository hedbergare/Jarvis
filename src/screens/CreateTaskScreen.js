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
import { addTaskToList } from "../../redux/actions/TaskListActions";
import DateService from "../services/DateService";

const CreateTaskScreen = ({ navigation, route }) => {
  Moment.locale("en");
  const dispatch = useDispatch();
  const taskLists = useSelector((state) => state.taskLists);
  const routeParams = route.params;

  const [date, setDate] = useState(new Date());

  const [assignedList, setAssignedList] = useState();
  const [assignedGoal, setAssignedGoal] = useState("None");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [toggleModal, setToggleModal] = useState();
  const [toggleRender, setToggleRender] = useState(false);

  const inputRef = React.createRef();

  useEffect(() => {
    if (routeParams?.listName) {
      setAssignedList(routeParams?.listName);
    } else {
      setAssignedList("General");
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
    for (let list of taskLists) {
      if (assignedList === list.name) {
        listId = list.key;
      }
    }
    const task = {
      name: name,
      description: description,
      deadline: date,
      date_created: now,
      listId: listId,
    };
    dispatch(addTaskToList(task));
    setToggleRender(!toggleRender);
    inputRef.current.clear();
  };

  const renderTaskListPicker = (list, index) => {
    return <Picker.Item key={index} label={list.name} value={list.name} />;
  };
  return (
    <ScrollView contentContainerStyle={styles.CreateTaskScreen}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        contentContainerStyle={styles.Content}
      >
        <ScreenHeader title="Create a Task" navigation={navigation} />
        <CreateField
          src={icons.alphabet}
          placeholder="Declare a name"
          title="Name"
          textChanged={(text) => {
            setName(text);
          }}
          toggleRender={toggleRender}
        />
        <ToggleInput
          title="Due date"
          icon={icons.calender}
          value={DateService.formatDate(date)}
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
        <Text style={[fonts.heading5, styles.descriptionText]}>
          <Font text="Description:"></Font>
        </Text>
        <TextInput
          ref={inputRef}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={4}
          placeholder="Add descripion..."
          style={styles.description}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddTask()}
        >
          <Text style={[fonts.heading3, styles.addButtonText]}>
            <Font text="Add Task"></Font>
          </Text>
        </TouchableOpacity>
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
  addButton: {
    marginVertical: 20,
    marginLeft: "40%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.purple,
    borderRadius: 50,
  },
  addButtonText: {
    color: colors.white,
  },
});
