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
      .orderByChild("userId")
      .equalTo(uid)
      .on("value", (snapshot) => {
        snapshot.forEach((goal) => {
          const tempObject = goal.val();
          tempObject.key = goal.key;
          goals.push(tempObject);
        });
        dispatch({ type: FETCH_OWN_GOALS, goals: goals });
      });
  };
};
