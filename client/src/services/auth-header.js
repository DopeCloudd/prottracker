// Function to generate headers for authenticated requests
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        // If the user is logged in and has an access token, return headers with the token
        // This is specifically formatted for a Node.js Express back-end
        return { 'x-access-token': user.accessToken };
    } else {
        // If there is no user or accessToken, return an empty object (no headers)
        return {};
    }
}
