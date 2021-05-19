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

import { addGoal } from "../../redux/actions/GoalActions";

const CreateGoalScreen = ({ navigation }) => {
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
  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState("");

  const [description, setDescription] = useState("");

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
    };
    dispatch(addGoal(userId, goal));
    navigation.navigate("GoalsScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.CreateGoalScreen}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        contentContainerStyle={styles.content}
      >
        <ScreenHeader title="Declare Goal" navigation={navigation} />

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
          handleOnPress={() => setToggleModal("date")}
        />
        <ToggleInput
          title="Share Goal (optional)"
          icon={icons.share}
          value={"None"}
          handleOnPress={() => setToggleModal("")}
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
            placeholder="Assign a goal value"
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
              placeholder="Enter a unit (eg. miles)"
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
          placeholder="Add descripion..."
          style={styles.description}
        />
        <View style={styles.confrimButtonStyle}>
          <ConfirmButton
            confirmText="Create goal"
            handleConfirm={() => handleAddGoal()}
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
  confrimButtonStyle: {
    marginTop: 20,
    marginLeft: "30%",
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
});
