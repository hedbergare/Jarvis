import { FETCH_OWN_GOALS } from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchOwnGoals = (uid) => {
  const goals = [];
  return (dispatch) => {
    firebase
      .database()
      .ref("/goals/")
      .orderByChild("ownerId")
      .equalTo(uid)
      .on("value", (snapshot) => {
        snapshot.forEach((goal) => {
          goals.push(goal.val());
        });
        dispatch({ type: FETCH_OWN_GOALS, goals: goals });
      });
  };
};
