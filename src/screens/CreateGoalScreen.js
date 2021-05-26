import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";

import { fonts } from "../../constants/fonts";

import { colors, icons } from "../../constants/vars";
import ConfirmButton from "../components/ConfirmButton";
import CreateField from "../components/CreateField";
import Font from "../components/Font";
import ScreenHeader from "../components/ScreenHeader";
import ThemeSample from "../components/ThemeSample";
import ToggleInput from "../components/ToggleInput";
import DateService from "../services/DateService";
import { useDispatch, useSelector } from "react-redux";
import ShareWithPicker from "../components/ShareWithPicker";

import { addGoal, editGoal } from "../../redux/actions/GoalActions";
import color from "color";

const CreateGoalScreen = ({ navigation, route }) => {
  const routeParams = route.params;

  const now = new Date();

  const userId = useSelector((state) => state.currentUser.uid);

  const [toggleRender, setToggleRender] = useState(false);
  const [toggleModal, setToggleModal] = useState();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [theme, setTheme] = useState("#04a783");
  const [date, setDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  );
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [shareWith, setShareWith] = React.useState([]);

  const [goalToEdit, setGoalToEdit] = React.useState(null);

  useEffect(() => {
    console.log("UseEffect: routeparams har ändrats");
    if (routeParams?.editGoal) {
      setGoalToEdit(routeParams.editGoal);
      setDate(new Date(routeParams.editGoal.deadline));
      setTheme(routeParams.editGoal.theme);
      setQuantity(routeParams.editGoal.max_value);
      if (routeParams.editGoal.shared_with) {
        for (let user in routeParams.editGoal.shared_with) {
          console.log("Lägger in en användare i shareWith");
          shareWith.push(user);
        }
      }
      console.log(shareWith);
    }
  }, [routeParams]);

  const handleOnShareWith = (id) => {
    shareWith.push(id);
    console.log(shareWith);
  };
  const handleRemoveShareWith = (id) => {
    shareWith.splice(shareWith.indexOf(id), 1);
    console.log(shareWith);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleAddGoal = () => {
    const goal = {
      name: name,
      description: description,
      quantified: quantity ? true : false,
      deadline: date,
      max_value: quantity,
      date_created: now,
      theme: theme,
      unit: unit,
      shareWith: shareWith,
    };
    dispatch(addGoal(userId, goal));
    navigation.navigate("GoalsScreen");
  };

  const handleEditGoal = () => {
    console.log("HandleEditGoal");
    const goal = {
      name: name,
      description: description,
      quantified: quantity ? true : false,
      deadline: date,
      max_value: quantity,
      theme: theme,
      unit: unit,
      shareWith: shareWith,
    };
    console.log("Ska redigera målet till detta: ", goal);
    dispatch(editGoal(goalToEdit.key, goal));
    /* dispatch */
    clear();
  };
  const clear = () => {
    setGoalToEdit(null), setName("");
    setDescription("");
    setQuantity(null);
    setDate(null);
    setShareWith([]);
    setUnit("");
    setTheme("#04a783");
    navigation.navigate("GoalsScreen");
  };

  console.log(shareWith);

  return (
    <ScrollView contentContainerStyle={styles.CreateGoalScreen}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        contentContainerStyle={styles.content}
      >
        <ScreenHeader
          title={goalToEdit ? "Edit Goal" : "Declare Goal"}
          navigation={navigation}
        />

        <CreateField
          src={icons.alphabet}
          placeholder={goalToEdit ? goalToEdit.name : "Declare a name"}
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
          handleOnPress={() => setToggleModal("date")}
        />
        <ShareWithPicker
          handleOnShareWith={(id) => handleOnShareWith(id)}
          handleRemoveShareWith={(id) => handleRemoveShareWith(id)}
          alreadyShared={
            routeParams
              ? routeParams.editGoal.shared_with
                ? routeParams.editGoal.shared_with
                : []
              : []
          }
        />
        <View style={styles.contentWidth}>
          <Font text="Choose theme:" font={fonts.heading3}></Font>
          <View style={styles.sampleContainer}>
            <View style={{ opacity: theme === colors.green ? 1 : 0.3 }}>
              <ThemeSample
                color={colors.green}
                handleOnPress={() => setTheme(colors.green)}
              />
            </View>
            <View style={{ opacity: theme === colors.blueDark ? 1 : 0.3 }}>
              <ThemeSample
                color={colors.blueDark}
                handleOnPress={() => setTheme(colors.blueDark)}
              />
            </View>

            <View style={{ opacity: theme === colors.redLight ? 1 : 0.3 }}>
              <ThemeSample
                color={colors.redLight}
                handleOnPress={() => setTheme(colors.redLight)}
              />
            </View>

            <View style={{ opacity: theme === colors.yellow ? 1 : 0.3 }}>
              <ThemeSample
                color={colors.yellow}
                handleOnPress={() => setTheme(colors.yellow)}
              />
            </View>

            <View style={{ opacity: theme === colors.blue ? 1 : 0.3 }}>
              <ThemeSample
                color={colors.blue}
                handleOnPress={() => setTheme(colors.blue)}
              />
            </View>

            <View style={{ opacity: theme === colors.purple ? 1 : 0.3 }}>
              <ThemeSample
                color={colors.purple}
                handleOnPress={() => setTheme(colors.purple)}
              />
            </View>
          </View>
        </View>
        <View style={styles.goalValueContainer}>
          <CreateField
            src={icons.target}
            placeholder={
              goalToEdit
                ? goalToEdit.quantified
                  ? goalToEdit.max_value
                  : "Assign a goal value"
                : "Assign a goal value"
            }
            title="Goal value (optional)"
            textChanged={(text) => {
              setQuantity(text);
            }}
            toggleRender={toggleRender}
          />
        </View>
        {quantity ? (
          <View style={styles.goalValueContainer}>
            <CreateField
              src={icons.none}
              placeholder={
                goalToEdit?.quantified
                  ? goalToEdit.unit
                  : "Enter a unit (eg. miles)"
              }
              title="Unit"
              textChanged={(text) => {
                setUnit(text);
              }}
              toggleRender={toggleRender}
            />
          </View>
        ) : null}
        <Text style={[fonts.heading5, styles.descriptionText]}>
          <Font text="Description:"></Font>
        </Text>
        <TextInput
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={4}
          placeholder={
            goalToEdit ? goalToEdit.description : "Add descripion..."
          }
          style={styles.description}
        />
        <View style={styles.confirmButtonStyle}>
          {goalToEdit ? (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                clear();
              }}
            >
              <Text style={[fonts.heading3, styles.cancelButtonText]}>
                <Font text="Cancel"></Font>
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <ConfirmButton
            confirmText={goalToEdit ? "Submit changes" : "Create goal"}
            handleConfirm={() => {
              goalToEdit ? handleEditGoal() : handleAddGoal();
            }}
          />
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
              minimumDate={
                new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
              }
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
    </ScrollView>
  );
};

export default CreateGoalScreen;

const styles = StyleSheet.create({
  CreateGoalScreen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    alignItems: "center",
  },
  contentWidth: {
    width: "90%",
  },
  sampleContainer: {
    flexDirection: "row",
    paddingBottom: 30,
    borderBottomColor: colors.black + "30",
    borderBottomWidth: 1,
  },
  descriptionText: {
    marginTop: 30,
    fontWeight: "900",
    width: "90%",
    marginBottom: 10,
  },
  description: {
    padding: 10,
    height: 150,
    width: "90%",
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 10,
  },
  confirmButtonStyle: {
    marginTop: 20,
    flexDirection: "row",
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
  goalValueContainer: {
    marginTop: 20,
  },
  cancelButton: {
    marginVertical: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderColor: colors.purple,
    borderWidth: 1,
    color: colors.purple,
  },
});
