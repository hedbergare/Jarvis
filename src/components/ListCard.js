import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";
import { Ionicons } from "@expo/vector-icons";
import DateService from "../services/DateService";

const ListCard = ({ list, onPressHandler }) => {
  const getTotal = () => {
    if (list.items) {
      const items = Object.values(list.items);
      return Object.keys(items).length;
    } else {
      return 0;
    }
  };

  const getCompleted = () => {
    let counter = 0;
    if (list.items) {
      for (let item of Object.values(list.items)) {
        if (item.completed) {
          counter++;
        }
      }
    }
    return counter;
  };
  return (
    <TouchableOpacity
      style={styles.ListCard}
      onPress={() => onPressHandler(list)}
    >
      <View style={styles.circle}></View>
      <View style={styles.textContainer}>
        <Text
          style={[
            fonts.heading2,
            {
              textDecorationLine: list.completed ? "line-through" : "none",
            },
          ]}
        >
          <Font text={list.name}></Font>
        </Text>
        <Text
          style={[
            fonts.subText,
            {
              textDecorationLine: list.completed ? "line-through" : "none",
            },
          ]}
        >
          <Font text={DateService.formatTimeStamp(list.date_created)}></Font>
        </Text>
      </View>
      <View style={styles.rightFloatContainer}>
        <Text
          style={[
            fonts.subText,
            styles.completed,
            {
              textDecorationLine: list.completed ? "line-through" : "none",
            },
          ]}
        >
          <Font text={getCompleted() + "/" + getTotal()}></Font>
        </Text>
        <Ionicons
          name="chevron-forward-outline"
          color={colors.black}
          size={40}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  ListCard: {
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    width: "85%",
  },
  rightFloatContainer: {
    flexDirection: "row",
    alignItems: "center",
    /* width: "20%", */
    right: 0,
    /* justifyContent: "space-between", */
  },
  textContainer: {
    width: "65%",
    paddingLeft: 10,
  },
  circle: {
    backgroundColor: colors.green,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
