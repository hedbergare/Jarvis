import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, Text } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import { Ionicons } from "@expo/vector-icons";

import Font from "./Font";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import FriendCard from "./FriendCard";
import { addFriend, removeFriend } from "../../redux/actions/OtherUsersActions";
const FriendListModal = ({
  title,
  handleOnShareWith,
  handleClose,
  visible,
  share,
}) => {
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
    <View>
      <Modal
        presentationStyle="overFullScreen"
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={() => {
          handleClose();
        }}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => {
            handleClose();
          }}
          activeOpacity={1}
        >
          <TouchableOpacity
            style={styles.modal}
            onPress={() => {}}
            activeOpacity={1}
          >
            <View style={styles.contentContainer}>
              <TouchableOpacity
                style={styles.modalIconContainer}
                onPress={handleClose}
              >
                <Ionicons
                  name="close-outline"
                  color={colors.grayDark}
                  size={30}
                />
              </TouchableOpacity>
              <View style={styles.titleBorder}>
                <Text style={[fonts.heading3, styles.title]}>
                  <Font text={title}></Font>
                </Text>
              </View>
              <FlatList
                style={styles.friendFlatList}
                data={data}
                renderItem={renderFriendCard}
                keyExtractor={(item) => item.key}
                ListHeaderComponent={
                  <SearchBar
                    placeholder="Search for email"
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
                }
                ListFooterComponent={
                  <>
                    <View style={styles.friendTitleContainer}>
                      <Font
                        text="My Friends:"
                        textStyle={[fonts.heading3, styles.title]}
                      />
                    </View>
                    <View style={styles.myFriendListContainer}>
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
                                share={share}
                                handleOnPress={(id) =>
                                  share
                                    ? handleOnShareWith(id)
                                    : handleOnRemoveFriend(id)
                                }
                                id={user.key}
                              />
                            );
                          }
                        })
                      ) : (
                        <></>
                      )}
                    </View>
                  </>
                }
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default FriendListModal;

const styles = StyleSheet.create({
  modalBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.black,
    flex: 1,
  },
  contentContainer: {
    alignSelf: "center",
    paddingTop: 100,
    paddingHorizontal: 20,
    minWidth: "90%",
    height: 400,
    borderRadius: 20,
    backgroundColor: colors.white,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  addUserCont: {
    marginTop: 30,
  },
  title: {
    color: colors.black,
  },
  titleBorder: {
    position: "absolute",
    top: 30,
  },
  modalIconContainer: {
    position: "absolute",
    left: 15,
    top: 15,
  },
  friendFlatList: {},
  searchBar: {
    backgroundColor: colors.white,
    borderRadius: 6,
    borderColor: colors.black,
    width: 250,
    padding: 0,
    alignItems: "baseline",
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
    alignSelf: "baseline",
    marginTop: 30,
  },
  myFriendListContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    width: 270,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black + "90",
  },
  modal: {
    zIndex: 0,
  },
});
