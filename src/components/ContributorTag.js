import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";

const ContributorTag = ({ value }) => {
  const otherUsers = useSelector((state) => state.otherUsers);

  const currentUser = useSelector((state) => state.currentUser);

  const fetchFirstLetter = () => {
    for (const user of otherUsers) {
      if (user.key === value) {
        return user.first_name[0];
      }
    }
    return currentUser.first_name[0];
  };
  const displayText = fetchFirstLetter();

  return (
    <View style={styles.contributorTag}>
      <Font
        text={displayText}
        textStyle={styles.text}
        font={fonts.heading3}
      ></Font>
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
