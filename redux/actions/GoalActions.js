import { FETCH_OWN_GOALS, ADD_GOAL } from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchOwnGoals = (uid) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/goals/")
      .orderByChild("userId")
      .equalTo(uid)
      .on("value", (snapshot) => {
        const goals = [];

        snapshot.forEach((goal) => {
          const tempObject = goal.val();
          tempObject.key = goal.key;
          goals.push(tempObject);
        });
        dispatch({ type: FETCH_OWN_GOALS, goals: goals });
      });
  };
};

export const addGoal = (uid, goal) => {
  return (dispatch) => {
    firebase.database().ref().child("/goals/").push().set({
      name: goal.name,
      userId: uid,
      completed: false,
      quantified: false,
      date_created: goal.date_created.getTime(),
      shared_with: {},
      description: goal.description,
      deadline: goal.deadline.getTime(),
      theme: goal.theme,
    });
    dispatch({ type: ADD_GOAL });
  };
};
