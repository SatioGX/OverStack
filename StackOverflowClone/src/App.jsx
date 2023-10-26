//App.js
import './App.css';

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Pages/Login/Login";
import SignUp from './Pages/Signup/Signup';
import PasswordReset from './Pages/PasswordReset/PasswordReset';
import CreatePost from './Pages/CreatePost/CreatePost'
import HomePage from './pages/Home/HomePage';
import Settings from './Pages/Settings/Settings';
import Navbar from './Components/Navbar/Navbar'




function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const [currentUserState, setCurrentUser] = useState();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(currentUser);

    if (!currentUser || location.pathname === "/signup") {
      navigate("/signup");
    }

    if (!currentUser) {
      navigate("/");
    }

    if (
      currentUser &&
      (location.pathname === "/" || location.pathname === "/signup")
    ) {
      navigate("/home");
    }
  }, []);



  return (
    <div>
    {currentUserState && <Navbar data={currentUserState} />}
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

