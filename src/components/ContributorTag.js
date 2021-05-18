import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";

const ContributorTag = ({ value }) => {
  return (
    <View style={styles.contributorTag}>
      <Font text={value} textStyle={styles.text} font={fonts.heading3}></Font>
    </View>
  );
};

export default ContributorTag;

const styles = StyleSheet.create({
  contributorTag: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: colors.blueDark,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: colors.white },
});
