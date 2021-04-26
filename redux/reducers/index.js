import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import TaskListReducer from "./TaskListReducer";
import GoalReducer from "./GoalReducer";
import ShoppingListReducer from "./ShoppingListReducer.js";

export default combineReducers({
  currentUser: AuthReducer,
  taskLists: TaskListReducer,
  goals: GoalReducer,
  shoppingLists: ShoppingListReducer,
});
