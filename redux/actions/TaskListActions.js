import {
  ADD_TASK_LIST,
  ADD_TASK,
  FETCH_TASK_LISTS,
  COMPLETE_TASK,
  SHARE_TASK_LIST,
  COMPLETE_SHARED_TASK,
  EDIT_TASK_LIST,
  DELETE_TASK_LIST,
  DELETE_TASK,
  EDIT_TASK,
} from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchTaskLists = (uid) => {
  let taskLists;
  return (dispatch) => {
    firebase
      .database()
      .ref("/task_lists/")
      .orderByChild("userId")
      .equalTo(uid)
      .on("value", (snapshot) => {
        taskLists = [];
        snapshot.forEach((list) => {
          const tempObject = list.val();
          tempObject.key = list.key;
          for (const index in tempObject.tasks) {
            tempObject.tasks[index].key = index;
          }
          taskLists.push(tempObject);
        });

        dispatch({ type: FETCH_TASK_LISTS, task_lists: taskLists });
      });
  };
};

export const addTaskList = (uid, name) => {
  return (dispatch) => {
    firebase.database().ref().child("/task_lists/").push().set({
      name: name,
      userId: uid,
      completed: false,
      date_created: new Date().getTime(),
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
        deadline: task.deadline.getTime(),
        date_created: task.date_created.getTime(),
        completed: false,
        connected_goal: {},
      });
    firebase
      .database()
      .ref("/task_lists/" + task.listId)
      .update({ completed: false });
    dispatch({ type: ADD_TASK });
  };
};
export const completeTask = (taskListId, taskId, updatedState) => {
  const ref = firebase.database().ref("/task_lists/" + taskListId);
  return (dispatch) => {
    firebase
      .database()
      .ref("/task_lists/" + taskListId + "/tasks/" + taskId)
      .update({ completed: updatedState });
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
export const submitEditTaskList = (name, listId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/task_lists/" + listId)
      .update({ name: name });
    dispatch({ type: EDIT_TASK_LIST });
  };
};
export const deleteTaskList = (listId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/task_lists/" + listId)
      .remove();
    dispatch({ type: DELETE_TASK_LIST });
  };
};

export const deleteTask = (listId, taskId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/task_lists/" + listId + "/tasks/" + taskId)
      .remove();
    dispatch({ type: DELETE_TASK });
  };
};
export const editTask = (taskId, task) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/task_lists/" + task.listId + "/tasks/" + taskId)
      .update({
        name: task.name,
        description: task.description,
        deadline: task.deadline,
      });
    dispatch({ type: EDIT_TASK });
  };
};
