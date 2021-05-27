import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";
import { Ionicons } from "@expo/vector-icons";
import DateService from "../services/DateService";
import Swipeable from "react-native-gesture-handler/Swipeable";
import SwipeButtons from "./SwipeButtons";

const ListCard = ({
  list,
  onPressHandler,
  handleDelete,
  handleEdit,
  swipeable,
}) => {
  const swipeableRef = React.useRef(null);
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
    <>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={() => (
          <SwipeButtons
            onDeletePress={() => {
              handleDelete(list);
              swipeableRef.current.close();
            }}
            onEditPress={() => {
              handleEdit(list);
              swipeableRef.current.close();
            }}
          ></SwipeButtons>
        )}
        friction={swipeable ? 2 : 10000}
        rightThreshold={20}
        containerStyle={styles.swipeContainer}
      >
        <View style={styles.ListCard}>
          <TouchableOpacity
            style={styles.content}
            onPress={() => {
              onPressHandler(list);
            }}
          >
            <View
              style={[
                styles.circle,
                { backgroundColor: list.completed ? colors.green : colors.red },
              ]}
            ></View>
            <View style={styles.textContainer}>
              <Text
                style={[
                  fonts.heading2,
                  {
                    textDecorationLine: list.completed
                      ? "line-through"
                      : "none",
                  },
                ]}
              >
                <Font text={list.name}></Font>
              </Text>
              <Text
                style={[
                  fonts.subText,
                  {
                    textDecorationLine: list.completed
                      ? "line-through"
                      : "none",
                  },
                ]}
              >
                <Font
                  text={DateService.formatTimeStamp(list.date_created)}
                ></Font>
              </Text>
            </View>
            <View style={styles.rightFloatContainer}>
              <Text
                style={[
                  styles.progressTextContainer,
                  fonts.subText,
                  styles.completed,
                  {
                    textDecorationLine: list.completed
                      ? "line-through"
                      : "none",
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
        </View>
      </Swipeable>
    </>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  ListCard: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.white,
  },
  swipeContainer: {
    width: "100%",
    marginBottom: 20,
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
    marginBottom: 5,
  },
  content: {
    paddingBottom: 20,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    flexDirection: "row",
    width: "86%",
    alignItems: "center",
    marginHorizontal: "7%",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  progressTextContainer: {
    marginRight: 8,
  },
});
