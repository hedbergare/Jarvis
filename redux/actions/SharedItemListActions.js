import { FETCH_SHARED_ITEM_LISTS, COMPLETE_SHARED_ITEM } from "../constants";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

export const fetchSharedItemLists = (uid) => {
  return (dispatch) => {
    let sharedLists;
    firebase
      .database()
      .ref("/item_lists/")
      .on("value", (snapshot) => {
        sharedLists = [];
        snapshot.forEach((list) => {
          for (let id in list.val().shared_with) {
            if (uid === id) {
              let tempObject = list.val();
              tempObject.key = list.key;

              for (const index in tempObject.items) {
                tempObject.items[index].key = index;
              }
              sharedLists.push(tempObject);
            }
          }
        });
        dispatch({ type: FETCH_SHARED_ITEM_LISTS, payload: sharedLists });
      });
  };
};
export const addQuantityShared = (listId, itemId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/item_lists/" + listId + "/items/" + itemId)
      .child("quantity")
      .set(firebase.database.ServerValue.increment(1));

    dispatch({ type: ADD_SHARED_QUANTITY });
  };
};
export const subtractQuantityShared = (listId, itemId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/item_lists/" + listId + "/items/" + itemId)
      .child("quantity")
      .set(firebase.database.ServerValue.increment(-1));

    dispatch({ type: SUBTRACT_SHARED_QUANTITY });
  };
};
export const completeSharedItem = (listId, itemId, updatedState) => {
  const ref = firebase.database().ref("/item_lists/" + listId);

  return (dispatch) => {
    firebase
      .database()
      .ref("/item_lists/" + listId + "/items/" + itemId)
      .update({ completed: updatedState });
    dispatch({ type: COMPLETE_SHARED_ITEM });
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
  };
};
