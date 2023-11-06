//App.js
import './App.css';

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from './pages/Login/Login';
import SignUp from './Pages/Signup/Signup';
import PasswordReset from './Pages/PasswordReset/PasswordReset';
import CreatePost from './Pages/CreatePost/CreatePost'
import HomePage from './pages/Home/HomePage';
import Settings from './Pages/Settings/Settings';
import Navbar from './Components/Navbar/Navbar'

import { auth } from '../firebase.config';




function App() {

  const navigate= useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user, 'user');
        setIsAuthenticated(true);
        if (location.pathname === "/signup" || location.pathname === "/") {
          navigate("/home");
        }
      } else {
        setIsAuthenticated(false);
        if (!user || location.pathname === "/signup") {
          navigate("/signup");
        }
    
        if (!user || location,pathname === "/resetpassword") {
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
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/resetpassword' element={<PasswordReset />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='/Settings' element={<Settings />} />
      </Routes>
    </div>

  );
}

export default App;

