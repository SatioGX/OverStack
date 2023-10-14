// App.js
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import Login from "./Components/Login/Login";
import SignUp from './Components/Signup/Signup';
import PasswordReset from './Components/PasswordReset/PasswordReset';
import HomePage from './pages/Home/HomePage';

function App() {
  

  return (
    
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/resetpassword' element={<PasswordReset />} />
        <Route path='/home' element={<HomePage />} />
        </Routes>
      </Router>
      
    
  );
}

export default App;

