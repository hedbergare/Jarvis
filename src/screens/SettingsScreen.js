import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import InputField from "../components/InputField";
import { colors, icons } from "../../constants/vars";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import Font from "../components/Font";
import { fonts } from "../../constants/fonts";
import firebase from "firebase/app";
import "firebase/database";
import ClickableField from "../components/ClickableField";
import FriendListModal from "../components/FriendListModal";

require("firebase/auth");

const SettingsScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.currentUser);

  const [showFriendModal, setShowFriendModal] = useState(false);

  const onSignoutPress = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.SettingsScreen}>
      <ScreenHeader title="Settings" navigation={navigation}></ScreenHeader>
      <InputField
        value={currentUser.first_name + " " + currentUser.last_name}
        editable={false}
        src={icons.profile}
      />
      <InputField
        value={currentUser.email}
        editable={false}
        src={icons.email}
      />
      <ClickableField text="Reset password" src={icons.key} />
      <ClickableField
        onPress={() => {
          setShowFriendModal(true);
        }}
        text="Manage friends"
        src={icons.profile}
      />
      <TouchableOpacity onPress={() => onSignoutPress()}>
        <Font
          textStyle={[fonts.heading3, styles.logOutText]}
          text="LOG OUT"
        ></Font>
      </TouchableOpacity>
      {showFriendModal ? (
        <FriendListModal
          title="Manage Friends"
          visible={showFriendModal}
          handleClose={() => setShowFriendModal(false)}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  SettingsScreen: {
    minHeight: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logOutText: {
    color: colors.red,
  },
});
