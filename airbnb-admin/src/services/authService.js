// Import axios so we can communicate with our backend
import axios from "axios";


// Backend API URL
// const API_URL = "http://localhost:5000/api/auth";
const API_URL = "https://airbnb-capstone-backend-server.onrender.com/api/auth";



// Login user
const loginUser = async (email, password) => {

    // Send POST request to backend
    const response = await axios.post(

        `${API_URL}/login`,

        {
            email,
            password
        }

    );

    // Return backend response
    return response.data;

};

// Register user
const registerUser = async (
    username,
    email,
    password,
    role = "admin"
) => {

    const response = await axios.post(
        `${API_URL}/register`,
        {
            username,
            email,
            password,
            role
        }
    );

    return response.data;
};


// Export functions
export default {

    loginUser,
    registerUser

};