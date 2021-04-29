import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import TaskListReducer from "./TaskListReducer";
import SharedTaskListReducer from "./SharedTaskListReducer";
import GoalReducer from "./GoalReducer";
import SharedGoalReducer from "./SharedGoalReducer";
import ShoppingListReducer from "./ShoppingListReducer.js";

export default combineReducers({
  currentUser: AuthReducer,
  taskLists: TaskListReducer,
  sharedTaskLists: SharedTaskListReducer,
  goals: GoalReducer,
  sharedGoals: SharedGoalReducer,
  shoppingLists: ShoppingListReducer,
});
