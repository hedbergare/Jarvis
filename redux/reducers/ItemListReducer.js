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

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ITEM_LISTS:
      return action.item_lists;
    case ADD_QUANTITY:
      return state;
    case SUBTRACT_QUANTITY:
      return state;
    case COMPLETE_ITEM:
      return state;
    case ADD_ITEM_LIST:
      return state;
    case ADD_ITEM:
      return state;
    case DELETE_ITEM:
      return state;
    case EDIT_ITEM:
      return state;
    case DELETE_ITEM_LIST:
      return state;
    case EDIT_ITEM_LIST:
      return state;
    default:
      return state;
  }
};
