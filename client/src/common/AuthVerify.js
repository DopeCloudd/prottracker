// Import necessary modules from React and React Router
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";

// Function to parse JWT token from localStorage
const parseJwt = (token) => {
    try {
        // Attempt to parse the payload of the JWT
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        // Return null if parsing fails
        return null;
    }
};

// Component to verify the authentication status on route changes
const AuthVerify = (props) => {
    let location = useLocation();

    useEffect(() => {
        // Retrieve the user object from localStorage
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            // Decode the JWT token
            const decodedJwt = parseJwt(user.accessToken);

            // Check if the token has expired
            if (decodedJwt.exp * 1000 < Date.now()) {
                // Log the user out if the token is expired
                props.logOut();
            }
        }
    }, [location, props]); // Re-run the effect if the location or props change

    // This component does not render anything
    return;
};

export default AuthVerify;
