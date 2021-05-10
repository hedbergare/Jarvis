import { LOGIN_USER, SIGN_IN } from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import * as Google from "expo-google-app-auth";

export const fetchUser = (uid) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/users/" + uid)
      .on("value", (snapshot) => {
        let user = snapshot.val();
        user.uid = snapshot.key;
        dispatch({ type: SIGN_IN, currentUser: user });
      });
  };
};
