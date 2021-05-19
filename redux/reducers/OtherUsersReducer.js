import { FETCH_OTHER_USERS, ADD_FRIEND, DELETE_FRIEND } from "../constants";

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_OTHER_USERS:
      return action.otherUsers;
    case ADD_FRIEND:
      return state;
    case DELETE_FRIEND:
      return state;
    default:
      return state;
  }
};
