// Import useContext hook
import { useContext } from "react";

// Import AuthContext
import { AuthContext } from "./AuthContext";

// Custom hook
const useAuth = () => {

    return useContext(AuthContext);

};

export default useAuth;