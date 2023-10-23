import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { SignOutUser, userStateListener } from "../../firebaseconfig"
import { createContext, useState, useEffect, ReactNode } from "react";

const AuthContext = createContext({
  currentUser: null, // Initialize currentUser as null
  setCurrentUser: (_user) => {},
  signOut: () => {}
});

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Initialize currentUser as null

  const navigate = useNavigate();

  useEffect(() => {
    // Your user state listener logic, which updates currentUser
    userStateListener((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        navigate("/"); // Redirect to the login page when user is not authenticated
      }
    });
  }, [navigate]);

  const signOut = () => {
    SignOutUser().then(() => {
      setCurrentUser(null);
      navigate("/"); // Redirect to the login page after signing out
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };