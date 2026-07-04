// Import React and ReactDOM 
import React from "react"; 
import ReactDOM from "react-dom/client"; 
// Import App component 
import App from "./App"; 
// Import global styles 
import "./index.css"; 
// Import Auth Provider
import { AuthProvider } from "./context/AuthContext";
  

// Render the application 
ReactDOM.createRoot(document.getElementById("root")).render( 
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode> 
);
