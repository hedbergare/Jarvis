import {
  FETCH_ITEM_LISTS,
  ADD_QUANTITY,
  SUBTRACT_QUANTITY,
  COMPLETE_ITEM,
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
    default:
      return state;
  }
};
