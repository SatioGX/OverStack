//App.js
import './App.css';

import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Login from "./Pages/Login/Login";
import SignUp from './Pages/Signup/Signup';
import PasswordReset from './Pages/PasswordReset/PasswordReset';
import CreatePost from './Pages/CreatePost/CreatePost'
import HomePage from './pages/Home/HomePage';
import Settings from './Pages/Settings/Settings';


function App() {
  

  return (


    <Routes>
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

