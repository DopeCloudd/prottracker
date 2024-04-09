import axios from 'axios';
import authHeader from './auth-header';

// Base URL for the user-related API
// This URL is the endpoint for user-specific actions and content access
const API_URL = "/auth/";

class UserService {
    // Function to get public content (no authentication required)
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    // Function to get content for normal users (authentication required)
    getUserBoard() {
        // Requests include headers obtained from authHeader() to ensure they are authenticated
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    // Function to get content for moderators (authentication and specific role required)
    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    // Function to get content for administrators (authentication and admin role required)
    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

// Export an instance of UserService for external usage
export default new UserService();
