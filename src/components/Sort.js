import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/vars";
import DropDownPicker from "react-native-dropdown-picker";
import SortingService from "../services/SortingService";

const Sort = ({ options, handleOnPress }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(options[0].value);
  const [items, setItems] = useState(options);
  useEffect(() => {
    handleOnPress(value);
  }, [value]);
  return (
    <View style={styles.Sort}>
      <DropDownPicker
        listMode="SCROLLVIEW"
        dropDownDirection="BOTTOM"
        placeholder={"SORT BY: " + value}
        style={{
          minWidth: 120,
          maxWidth: 180,

          borderWidth: 0,
          alignSelf: "flex-end",
        }}
        dropDownContainerStyle={{
          width: 100,
          borderWidth: 0,
          alignSelf: "flex-end",
          backgroundColor: colors.whiteDark,
        }}
        open={open}
        value={"SORT BY:" + value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
};

export default Sort;

const styles = StyleSheet.create({
  Sort: {
    flexDirection: "row",
    alignItems: "center",
  },
  chevronStyle: {
    marginLeft: 5,
  },
});
