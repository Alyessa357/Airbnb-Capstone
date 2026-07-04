// Import Navigate from React Router
import { Navigate } from "react-router-dom";

// Import our custom auth hook
import useAuth from "../context/useAuth";


function ProtectedRoute({ children }) {

    // Access token from Context API
    const { token } = useAuth();

    // If user is NOT logged in
    if (!token) {

        // Redirect to login page
        return <Navigate to="/" />;

    }

    // Otherwise render the page
    return children;

}

export default ProtectedRoute;