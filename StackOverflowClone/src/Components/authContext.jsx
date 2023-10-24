import { useNavigate } from 'react-router-dom';
import { SignOutUser, userStateListener } from "../../firebaseActions";
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: (_user) => {},
  signOut: () => {},
});

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Load user email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setCurrentUser({ email: storedEmail });
    }

    const unsubscribe = userStateListener((user) => {
      if (user) {
        // Set the user's email in localStorage
        localStorage.setItem('email', user.email);
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, []);

  const signOut = () => {
    // Remove the user's email from localStorage
    localStorage.removeItem('email');
    SignOutUser();
    setCurrentUser(null);
    navigate('/');
  }

  const value = {
    currentUser,
    setCurrentUser,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };