import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ThemeSample = React.memo(({ color, handleOnPress }) => {
  return (
    <TouchableOpacity
      style={[{ backgroundColor: color }, styles.ThemeSample]}
      onPress={handleOnPress}
    >
      <Text></Text>
    </TouchableOpacity>
  );
});

export default ThemeSample;

const styles = StyleSheet.create({
  ThemeSample: {
    width: 35,
    height: 35,
    borderRadius: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginRight: 20,
  },
});
