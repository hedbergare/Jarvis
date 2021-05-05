import { FETCH_SHARED_TASK_LISTS, COMPLETE_SHARED_TASK } from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchSharedTaskLists = (uid) => {
  return (dispatch) => {
    let sharedLists;
    firebase
      .database()
      .ref("/task_lists/")
      .on("value", (snapshot) => {
        sharedLists = [];
        snapshot.forEach((list) => {
          for (let id in list.val().shared_with) {
            if (uid === id) {
              let tempObject = list.val();
              tempObject.key = list.key;

              for (const index in tempObject.tasks) {
                tempObject.tasks[index].key = index;
              }
              sharedLists.push(tempObject);
            }
          }
        });
        dispatch({ type: FETCH_SHARED_TASK_LISTS, payload: sharedLists });
      });
  };
};

export const completeSharedTask = (taskListId, taskId, updatedState) => {
  const ref = firebase.database().ref("/task_lists/" + taskListId);

  return (dispatch) => {
    firebase
      .database()
      .ref("/task_lists/" + taskListId + "/tasks/" + taskId)
      .update({ completed: updatedState });
    dispatch({ type: COMPLETE_SHARED_TASK });
    firebase
      .database()
      .ref("/task_lists/" + taskListId + "/tasks/")
      .once("value", (tasks) => {
        let allTasks = true;
        tasks.forEach((task) => {
          if (!task.val().completed) {
            allTasks = false;
          }
        });
        ref.update({ completed: allTasks });
      });
  };
};
