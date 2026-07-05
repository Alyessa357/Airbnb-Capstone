import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// Shortcut hook — returns user, token, login, and logout from AuthContext
const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
