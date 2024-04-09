// Import action type constants for message handling
import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

// Action creator for setting a message in the Redux store
export const setMessage = (message) => ({
    type: SET_MESSAGE, // Specifies the type of action being dispatched
    payload: message, // The message to be set, passed as payload
});

// Action creator for clearing any messages from the Redux store
export const clearMessage = () => ({
    type: CLEAR_MESSAGE, // Specifies the type of action for clearing messages
});