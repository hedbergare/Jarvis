import {
  FETCH_ITEM_LISTS,
  ADD_QUANTITY,
  SUBTRACT_QUANTITY,
  COMPLETE_ITEM,
} from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchItemLists = (uid) => {
  let itemLists;
  return (dispatch) => {
    firebase
      .database()
      .ref("/item_lists/")
      .orderByChild("userId")
      .equalTo(uid)
      .on("value", (snapshot) => {
        itemLists = [];
        snapshot.forEach((list) => {
          const tempObject = list.val();
          tempObject.key = list.key;
          for (const index in tempObject.items) {
            tempObject.items[index].key = index;
          }
          itemLists.push(tempObject);
        });

        dispatch({ type: FETCH_ITEM_LISTS, item_lists: itemLists });
      });
  };
};
export const addQuantity = (listId, itemId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/item_lists/" + listId + "/items/" + itemId)
      .child("quantity")
      .set(firebase.database.ServerValue.increment(1));

    dispatch({ type: ADD_QUANTITY });
  };
};
export const subtractQuantity = (listId, itemId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/item_lists/" + listId + "/items/" + itemId)
      .child("quantity")
      .set(firebase.database.ServerValue.increment(-1));

    dispatch({ type: SUBTRACT_QUANTITY });
  };
};
export const completeItem = (listId, itemId, updatedState) => {
  const ref = firebase.database().ref("/item_lists/" + listId);
  return (dispatch) => {
    firebase
      .database()
      .ref("/item_lists/" + listId + "/items/" + itemId)
      .update({ completed: updatedState });
    firebase
      .database()
      .ref("/item_lists/" + listId + "/items/")
      .once("value", (items) => {
        let allItems = true;
        items.forEach((item) => {
          if (!item.val().completed) {
            allItems = false;
          }
        });
        ref.update({ completed: allItems });
      });
    dispatch({ type: COMPLETE_ITEM });
  };
};
