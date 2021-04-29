import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { colors } from "../../constants/vars";
import { fonts } from "../../constants/fonts";
import Tag from "./Tag.js";
import Font from "./Font";

const TaskCard = ({ handleOnPress }) => {
  const [checkboxState, setCheckboxState] = React.useState(false);

  return (
    <View style={[styles.TaskCard, { opacity: checkboxState ? 0.5 : 1 }]}>
      <View style={styles.content}>
        <BouncyCheckbox
          size={35}
          fillColor={colors.green}
          iconStyle={{
            borderColor: colors.green,
          }}
          onPress={() => {
            setCheckboxState(!checkboxState);
          }}
        />

        <TouchableOpacity style={styles.TaskCardText} onPress={handleOnPress}>
          <Text
            style={[
              styles.TaskCardTitle,
              fonts.heading3,
              {
                textDecorationLine: checkboxState ? "line-through" : "none",
              },
            ]}
          >
            <Font text="Drink a big glass of water" />
          </Text>
          <Text
            style={
              (fonts.subText,
              {
                textDecorationLine: checkboxState ? "line-through" : "none",
              })
            }
          >
            <Font text="Due to: Tue 10 Jun" />
          </Text>
        </TouchableOpacity>
        <Image
          style={styles.screenHeader}
          source={require("../assets/icon-delete-trash-can.png")}
        />
      </View>
      <View style={styles.tagContainer}>
        <Tag color={colors.yellow} text="Water habit" />
        <Tag color={colors.green} text="Gym" />
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  TaskCard: {
    width: "80%",
    marginLeft: "10%",
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  TaskCardText: {
    transform: [{ translateX: -15 }],
  },
  TaskCardTitle: {
    color: "black",
  },
  tagContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
});
