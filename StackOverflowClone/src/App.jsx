//App.js
import './App.css';

import { Route,Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import Login from "./Pages/Login/Login";
import SignUp from './Pages/Signup/Signup';
import PasswordReset from './Pages/PasswordReset/PasswordReset';
import CreatePost from './Pages/CreatePost/CreatePost'
import HomePage from './pages/Home/HomePage';
import Settings from './Pages/Settings/Settings';




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


    <Routes>
      {currentUserState && <Navbar data={currentUserState} />}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/resetpassword' element={<PasswordReset />} />


      <Route path='/home' element={<HomePage />} />
      <Route path='/createpost' element={<CreatePost />} />
      <Route path='/Settings' element={<Settings />} />



    </Routes>



  );
}

export default App;

