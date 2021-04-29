import {
  ADD_TASK_LIST,
  ADD_TASK,
  FETCH_TASK_LISTS,
  COMPLETE_TASK,
  SHARE_TASK_LIST,
} from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchTaskLists = (uid) => {
  const taskLists = [];
  return (dispatch) => {
    firebase
      .database()
      .ref("/task_lists/")
      .orderByChild("userId")
      .equalTo(uid)
      .on("value", (snapshot) => {
        snapshot.forEach((list) => {
          taskLists.push(list.val());
        });
        dispatch({ type: FETCH_TASK_LISTS, task_lists: taskLists });
      });
  };
};

export const addTaskList = (uid) => {
  return (dispatch) => {
    firebase.database().ref().child("/task_lists/").push().set({
      /* TODO - replace temporary info with data from parameter*/
      name: "Another task list w/o tasks",
      description: "New description for task list",
      userId: uid,
      completed: false,
      deadline: "2021-05-15",
      date_created: "2021-04-22",
      tasks: {},
      shared_with: {},
    });
    dispatch({ type: ADD_TASK_LIST });
  };
};

export const addTaskToList = (task) => {
  return (dispatch) => {
    firebase
      .database()
      .ref()
      .child("/task_lists/" + task.listId + "/tasks/")
      .push()
      .set({
        name: task.name,
        description: task.description,
        deadline: task.deadline,
        date_created: task.date_created,
        completed: false,
      });
    dispatch({ type: ADD_TASK });
  };
};
export const completeTask = (taskListId, taskId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/task_lists/" + taskListId + "/tasks/" + taskId)
      .update({ completed: true });
    dispatch({ type: COMPLETE_TASK });
  };
};
export const shareTaskList = (taskListId, shareId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/task_lists/" + taskListId + "/shared_with/" + shareId)
      .set(true);
    dispatch({ type: SHARE_TASK_LIST });
  };
};
