//App.js
import './App.css';

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Login from "./Pages/Login/Login";
import SignUp from './Pages/Signup/Signup';
import PasswordReset from './Pages/PasswordReset/PasswordReset';
import CreatePost from './Pages/CreatePost/CreatePost'
import HomePage from './pages/Home/HomePage';
import Settings from './Pages/Settings/Settings';
import Navbar from './Components/Navbar/Navbar'
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import { auth } from '../firebase.config';
import QuestionsPage from './Pages/Questions/QuestionsPage';

export const AuthContext = createContext();


function App() {

  const navigate= useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserData(user);
        if (location.pathname === "/signup" || location.pathname === "/") {
          navigate("/home");
        }
      } else {
        setIsAuthenticated(false);
        if (!user || location.pathname === "/signup") {
          navigate("/signup");
        }
    
        if (!user || location.pathname === "/resetpassword") {
          navigate("/resetpassword")
        }

        if (!user) {
          navigate("/");
        }
        
      }
    });
  }, []);

 


  return (
    <div>
      {isAuthenticated && <Navbar data={isAuthenticated} />}
      <AuthContext.Provider value={userData}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/resetpassword' element={<PasswordReset />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/questions' element={<QuestionsPage />} />
        </Routes>
      </AuthContext.Provider>
    </div>

  );
}

export default App;

