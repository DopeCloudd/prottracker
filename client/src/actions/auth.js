// Import action type constants and AuthService for authentication logic
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./types";
import AuthService from "../services/auth.service";

// Redux thunk action creator for handling registration
export const register = (name, firstName, email, password) => (dispatch) => {
    return AuthService.register(name, firstName, email, password).then(
        (response) => {
            // Dispatches an action for successful registration
            dispatch({
                type: REGISTER_SUCCESS,
            });

            // Dispatches an action to set a success message from the server response
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            // Error handling
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            // Dispatches actions for registration failure and setting an error message
            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

// Redux thunk action creator for handling login
export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
        (data) => {
            // Dispatches an action for successful login, including user data as payload
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user: data},
            });

            return Promise.resolve();
        },
        (error) => {
            // Error handling
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            // Dispatches actions for login failure and setting an error message
            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

// Redux thunk action creator for handling logout
export const logout = () => (dispatch) => {
    AuthService.logout(); // Calls the AuthService to perform logout

    dispatch({
        type: LOGOUT, // Dispatches an action to update the store's state to reflect that the user has logged out
    });
};