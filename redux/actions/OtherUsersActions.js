import { FETCH_OTHER_USERS, ADD_FRIEND, DELETE_FRIEND } from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchOtherUsers = (uid) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/users/")
      .on("value", (users) => {
        let otherUsers = [];
        users.forEach((user) => {
          if (user.key !== uid) {
            const tempUser = user.val();
            tempUser.key = user.key;
            for (const friend in user.val().friends) {
              if (friend === uid) {
                tempUser.my_friend = true;
              }
            }
            if (!tempUser.my_friend) {
              tempUser.my_friend = false;
            }
            otherUsers.push(tempUser);
          }
        });
        dispatch({ type: FETCH_OTHER_USERS, otherUsers: otherUsers });
      });
  };
};
export const addFriend = (userId, friendId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/users/" + userId + "/friends/" + friendId)
      .set(true);
    firebase
      .database()
      .ref("/users/" + friendId + "/friends/" + userId)
      .set(true);
    dispatch({ type: ADD_FRIEND });
  };
};
export const removeFriend = (userId, friendId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/users/" + userId + "/friends/" + friendId)
      .remove();
    firebase
      .database()
      .ref("/users/" + friendId + "/friends/" + userId)
      .remove();
    dispatch({ type: DELETE_FRIEND });
  };
};
