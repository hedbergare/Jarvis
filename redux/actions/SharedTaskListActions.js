import { FETCH_SHARED_TASK_LISTS } from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchSharedTaskLists = (uid) => {
  const sharedLists = [];
  return (dispatch) => {
    firebase
      .database()
      .ref("/users/" + uid + "/shared_task_lists/")
      .on("value", (snapshot) => {
        snapshot.forEach((shared_list) => {
          /* console.log(shared_list.key); */
          firebase
            .database()
            .ref("/task_lists/" + shared_list.key)
            .on("value", (list) => {
              sharedLists.push(list.val());
            });
        });
      });
    dispatch({ type: FETCH_SHARED_TASK_LISTS, shared_task_lists: sharedLists });
  };
};
