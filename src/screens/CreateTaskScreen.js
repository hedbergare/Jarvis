import React from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import CreateField from "../components/CreateField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors, icons } from "../../constants/vars";
import ScreenHeader from "../components/ScreenHeader";
import ToggleInput from "../components/ToggleInput";
import Font from "../components/Font";
import { fonts } from "../../constants/fonts";

const CreateTaskScreen = ({ navigation }) => {
  const [dueDate, setDueDate] = React.useState("Thursday, 10th May");
  const [assignedList, setAssignedList] = React.useState("General");
  const [assignedGoal, setAssignedGoal] = React.useState("None");

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
        />
        <ToggleInput title="Due date" icon={icons.calender} value={dueDate} />
        <ToggleInput
          title="Assign to a list"
          icon={icons.list}
          value={assignedList}
        />
        <ToggleInput
          title="Assign to a goal (optional)"
          icon={icons.target}
          value={assignedGoal}
        />
        <Text style={[fonts.heading5, styles.descriptionText]}>
          <Font text="Description:"></Font>
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder="Add descripion..."
          style={styles.description}
        />
      </KeyboardAwareScrollView>
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
});
