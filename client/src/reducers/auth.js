// Import action type constants
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/types";

// Retrieve the current user from localStorage to set as the initial state
const user = JSON.parse(localStorage.getItem("user"));

// Define the initial state based on the user's presence
const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

// Reducer function for handling authentication actions
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
        case REGISTER_FAIL:
            // After registration attempt, user remains logged out
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            // On successful login, update state to reflect logged-in status and user information
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
        case LOGOUT:
            // On login failure or logout, update state to reflect that no user is logged in
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            // Return the current state if no related action types are matched
            return state;
    }
}
