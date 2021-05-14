import { FETCH_SHARED_ITEM_LISTS } from "../constants";
import { COMPLETE_SHARED_ITEM } from "../constants";
const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SHARED_ITEM_LISTS:
      return { ...state, sharedItemLists: action.payload };
    case COMPLETE_SHARED_ITEM:
      return { ...state };
    default:
      return { ...state };
  }
};
