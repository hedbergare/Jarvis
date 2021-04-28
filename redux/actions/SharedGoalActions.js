import { FETCH_SHARED_GOALS } from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchSharedGoals = (uid) => {
  const sharedGoals = [];
  return (dispatch) => {
    firebase
      .database()
      .ref("/users/" + uid + "/shared_goals/")
      .on("value", (snapshot) => {
        snapshot.forEach((shared_goal) => {
          firebase
            .database()
            .ref("/goals/" + shared_goal.key)
            .on("value", (goal) => {
              sharedGoals.push(goal.val());
            });
        });
      });
    dispatch({ type: FETCH_SHARED_GOALS, shared_goals: sharedGoals });
  };
};
