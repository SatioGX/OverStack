import { useContext, useEffect } from "react";
import { AuthContext } from "./authContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the currentUser is stored in localStorage on the initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      navigate('/home'); // Navigate to the home page if currentUser is found in localStorage
    }
  }, [setCurrentUser, navigate]);

  if (!currentUser) {
    return <useNavigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;

