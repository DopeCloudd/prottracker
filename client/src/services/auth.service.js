import axios from "axios";

// Base URL for the authentication API
// This URL is the endpoint for all authentication-related actions
const API_URL = "/auth/";

// Function to handle user registration
const register = (name, firstName, email, password) => {
    // Sends a POST request to the signup endpoint with user information
    return axios.post(API_URL + "signup", {
        name,
        firstName,
        email,
        password,
    });
};

// Function to handle user login
const login = (email, password) => {
    // Sends a POST request to the signin endpoint with credentials
    return axios
        .post(API_URL + "signin", {
            email,
            password,
        })
        .then((response) => {
            // If login is successful and an access token is returned, save it to localStorage
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

// Function to handle user logout
const logout = () => {
    // Removes the user information from localStorage, effectively logging them out
    localStorage.removeItem("user");
};

// Export the functions for external usage
export default {
    register,
    login,
    logout,
};
