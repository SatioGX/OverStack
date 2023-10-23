import { useContext } from "react";
import { AuthContext } from "./authContext";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const { currentUser } = useContext(AuthContext);
  let location = useLocation();

  if (!currentUser) {
    // Redirect the user to the home page.
    // Please, close the mustache {{}}
    return <Navigate to="/" state={ { from: location } } replace />;
  }

  return children;
}

export default RequireAuth;
