import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { fonts } from "../../constants/fonts";
import { colors, icons } from "../../constants/vars";
import Font from "./Font";
import FriendCard from "./FriendCard";
import SvgComponent from "./SvgComponent";

const ShareWithPicker = ({
  alreadyShared,
  handleRemoveShareWith,
  handleOnShareWith,
}) => {
  const otherUsers = useSelector((state) => state.otherUsers);
  return (
    <View style={styles.ShareWithPicker}>
      <View style={styles.title}>
        <SvgComponent content={icons.share} iconStyle={styles.iconStyle} />

        <Text style={fonts.heading5}>
          <Font text={"Share with:"}></Font>
        </Text>
      </View>
      <View style={styles.friendContainer}>
        {otherUsers ? (
          Object.values(otherUsers).map((user, index) => {
            if (user.my_friend) {
              return (
                <FriendCard
                  key={index}
                  firstName={user.first_name}
                  lastName={user.last_name}
                  email={user.email}
                  friends={true}
                  share={true}
                  handleShareWith={(id) => handleOnShareWith(id)}
                  removeShareWith={(id) => handleRemoveShareWith(id)}
                  id={user.key}
                  alreadySharedWith={
                    alreadyShared ? alreadyShared[user.key] : false
                  }
                />
              );
            }
          })
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default ShareWithPicker;

const styles = StyleSheet.create({
  ShareWithPicker: {
    flexDirection: "column",
    minWidth: "90%",
    paddingBottom: 10,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginRight: 10,
  },
  friendContainer: {
    flexDirection: "column",
    width: "100%",
  },
});
