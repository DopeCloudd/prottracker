// Import combineReducers helper function from Redux
import { combineReducers } from "redux";
// Import individual reducers
import auth from "./auth";
import message from "./message";

// Combine reducers into a single rootReducer
export default combineReducers({
    auth, // Authentication state reducer
    message, // Message state reducer
});
