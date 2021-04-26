import { FETCH_OWN_GOALS } from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchOwnGoals = (uid) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/goals/")
      .orderByChild("ownerId")
      .equalTo(uid)
      .on("value", (snapshot) => {
        dispatch({ type: FETCH_OWN_GOALS, goals: snapshot });
      });
  };
};
