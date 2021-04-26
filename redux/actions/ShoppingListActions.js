import { FETCH_SHOPPING_LISTS } from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchShoppingLists = (uid) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/shopping_lists/")
      .orderByChild("userId")
      .equalTo(uid)
      .on("value", (snapshot) => {
        dispatch({
          type: FETCH_SHOPPING_LISTS,
          shopping_lists: snapshot.val(),
        });
      });
  };
};
