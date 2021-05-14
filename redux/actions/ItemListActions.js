import {
  FETCH_ITEM_LISTS,
  ADD_QUANTITY,
  SUBTRACT_QUANTITY,
  COMPLETE_ITEM,
  ADD_ITEM_LIST,
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM_LIST,
  EDIT_ITEM_LIST,
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
export const addItemList = (uid, name) => {
  return (dispatch) => {
    firebase.database().ref().child("item_lists/").push().set({
      name: name,
      userId: uid,
      completed: false,
      date_created: new Date().getTime(),
      items: {},
      shared_with: {},
    });
    dispatch({ type: ADD_ITEM_LIST });
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

export const addItemToList = (name, quantity, listId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref()
      .child("/item_lists/" + listId + "/items/")
      .push()
      .set({
        name: name,
        completed: false,
        quantity: quantity,
      });
    firebase
      .database()
      .ref("/item_lists/" + listId)
      .update({ completed: false });
    dispatch({ type: ADD_ITEM });
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
export const deleteItem = (itemId, listId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/item_lists/" + listId + "/items/" + itemId)
      .remove()
      .catch((error) => console.log(error.message));
    dispatch({ type: DELETE_ITEM });
  };
};
export const submitEditItem = (name, quantity, itemId, listId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/item_lists/" + listId + "/items/" + itemId)
      .update({ name: name, quantity: quantity });
    dispatch({ type: EDIT_ITEM });
  };
};
export const submitEditList = (name, listId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/item_lists/" + listId)
      .update({ name: name });
    dispatch({ type: EDIT_ITEM_LIST });
  };
};
export const deleteItemList = (listId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/item_lists/" + listId)
      .remove()
      .catch((error) => {
        console.log(error.message);
      });
    dispatch({ type: DELETE_ITEM_LIST });
  };
};
