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
import RequireAuth from './Components/requireAuth';
import { AuthContext } from './Components/authContext';



function App() {

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()


  //   // NOTE: console log for testing purposes
  //console.log('User:', currentUser.email);

  // // Check if currentUser exists on initial render
  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser]);


  return (


    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/resetpassword' element={<PasswordReset />} />
      { <Route path="/profile" element={
       <RequireAuth> 
         <Route path='/home' element={<HomePage />} />
      <Route path='/createpost' element={<CreatePost />} />
      <Route path='/Settings' element={<Settings />} />
       </RequireAuth>}
      /> }
      
    </Routes>



  );
}

export default App;

