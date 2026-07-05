import axios from "axios";

// Backend auth API base URL
const API_URL =
    // "http://localhost:5000/api/auth";
    "https://airbnb-capstone-backend-server.onrender.com/api/auth";

// POST credentials and return JWT + user from the server
const login = async (userData) => {

    const response =
        await axios.post(
            `${API_URL}/login`,
            userData
        );

    return response.data;
};

// POST new user details and return the created account
const register = async (
    userData
) => {

    const response =
        await axios.post(
            `${API_URL}/register`,
            userData
        );

    return response.data;
};

const authService = {
    login,
    register
};

export default authService;
