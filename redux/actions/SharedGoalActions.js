import { FETCH_SHARED_GOALS } from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchSharedGoals = (uid) => {
  return (dispatch) => {
    let sharedGoals;
    firebase
      .database()
      .ref("/goals/")
      .on("value", (snapshot) => {
        sharedGoals = [];
        snapshot.forEach((goal) => {
          for (let id in goal.val().shared_with) {
            if (uid === id) {
              let tempObject = goal.val();
              tempObject.key = goal.key;
              sharedGoals.push(tempObject);
            }
          }
        });
        dispatch({ type: FETCH_SHARED_GOALS, shared_goals: sharedGoals });
      });
  };
};
