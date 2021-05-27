import {
  FETCH_OWN_GOALS,
  ADD_GOAL,
  DELETE_GOAL,
  EDIT_GOAL,
} from "../constants";
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
  let sharedWith = {};
  for (const friend of goal.shareWith) {
    sharedWith[friend] = true;
  }
  return (dispatch) => {
    firebase
      .database()
      .ref()
      .child("/goals/")
      .push()
      .set({
        name: goal.name,
        userId: uid,
        completed: false,
        quantified: goal.quantified,
        date_created: goal.date_created.getTime(),
        current_value: 0,
        max_value: goal.quantified ? goal.max_value : 0,
        shared_with: sharedWith,
        description: goal.description,
        unit: goal.unit,
        deadline: goal.deadline.getTime(),
        theme: goal.theme,
      });
    dispatch({ type: ADD_GOAL });
  };
};
export const deleteGoal = (goalId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/goals/" + goalId)
      .remove();
    dispatch({ type: DELETE_GOAL });
  };
};
export const editGoal = (goalId, goal) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/goals/" + goalId)
      .update({
        name: goal.name,
        max_value: goal.max_value,
        shared_with: goal.shareWith,
        quantified: goal.quantified,
        description: goal.description,
        unit: goal.unit,
        deadline: goal.deadline.getTime(),
        theme: goal.theme,
      });
    dispatch({ type: EDIT_GOAL });
  };
};
