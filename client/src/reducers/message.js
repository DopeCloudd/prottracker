// Import action type constants
import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

// Define the initial state
const initialState = {};

// Reducer function for handling message actions
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_MESSAGE:
            // Set message to payload if SET_MESSAGE action is dispatched
            return { message: payload };

        case CLEAR_MESSAGE:
            // Clear the message if CLEAR_MESSAGE action is dispatched
            return { message: "" };

        default:
            // Return the current state if no related action is dispatched
            return state;
    }
}
