import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import InputField from "../components/InputField";
import { colors, icons } from "../../constants/vars";
import { useDispatch, useSelector } from "react-redux";
import Font from "../components/Font";
import { fonts } from "../../constants/fonts";
import "firebase/database";
import FriendCard from "../components/FriendCard";
import { FlatList } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
import { addFriend, removeFriend } from "../../redux/actions/OtherUsersActions";
import { LogBox } from "react-native";
require("firebase/auth");

const FriendsScreen = ({ navigation }) => {
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

  const currentUser = useSelector((state) => state.currentUser);
  const otherUsers = useSelector((state) => state.otherUsers);

  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  const arrayholder = otherUsers;

  const searchData = (text) => {
    if (text != "") {
      const newData = arrayholder.filter((item) => {
        const itemData = item.email.toUpperCase();

        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
    } else {
      setData(null);
    }
  };
  const renderFriendCard = ({ item }) => {
    if (item.my_friend) {
      return;
    } else {
      return (
        <FriendCard
          firstName={item.first_name}
          lastName={item.last_name}
          email={item.email}
          handleOnPress={(id) => handleOnAddFriend(id)}
          friends={false}
          id={item.key}
          showEmail={true}
        />
      );
    }
  };
  const handleOnRemoveFriend = (friendId) => {
    dispatch(removeFriend(currentUser.uid, friendId));
  };
  const handleOnAddFriend = (friendId) => {
    dispatch(addFriend(currentUser.uid, friendId));
    setSearch("");
    setData(null);
  };

  return (
    <View style={styles.FriendsScreen}>
      <ScreenHeader
        title="Friends"
        navigation={navigation}
        hideBackArrow={true}
      ></ScreenHeader>
      <View style={styles.content}>
        <FlatList
          contentContainerStyle={styles.friendFlatList}
          ListHeaderComponentStyle={styles.flastListHeader}
          data={data}
          renderItem={renderFriendCard}
          keyExtractor={(item) => item.key}
          ListHeaderComponent={
            <>
              <View style={styles.friendTitleContainer}>
                <Font
                  text="Add Friends:"
                  textStyle={[fonts.heading3, styles.title]}
                />
              </View>
              <SearchBar
                placeholder="Search for email"
                returnKeyType="search"
                placeholderTextColor={colors.gray}
                containerStyle={styles.searchBar}
                inputContainerStyle={styles.searchBarInput}
                inputStyle={[styles.searchBarInputText, fonts.subText]}
                onChangeText={(text) => {
                  setSearch(text);
                  searchData(text);
                }}
                autoCorrect={false}
                value={search}
                lightTheme
              />
            </>
          }
          ListFooterComponent={
            <View style={styles.myFriendListContainer}>
              <View style={styles.friendTitleContainer}>
                <Font
                  text="Your Friends:"
                  textStyle={[fonts.heading3, styles.title]}
                />
              </View>
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
                        handleOnPress={(id) => handleOnRemoveFriend(id)}
                        id={user.key}
                        showEmail={true}
                      />
                    );
                  }
                })
              ) : (
                <></>
              )}
            </View>
          }
        />
      </View>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  FriendsScreen: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.white,
    alignItems: "center",
  },
  content: {
    width: "100%",
    height: 380,
    backgroundColor: colors.white,
  },

  friendFlatList: {
    width: "100%",
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: colors.white,
    borderRadius: 6,
    borderColor: colors.black,
    width: 250,
    padding: 0,
    alignItems: "baseline",
    marginTop: 10,
    marginBottom: 20,
  },
  searchBarInputText: {
    color: colors.black,
    backgroundColor: colors.white,
    alignItems: "flex-start",
  },
  searchBarInput: {
    backgroundColor: colors.white,
  },
  friendTitleContainer: {
    width: 250,
    transform: [{ translateX: -30 }],
    marginBottom: 10,
  },
});
