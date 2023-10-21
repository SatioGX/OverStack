//App.js
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import Login from "./Pages/Login/Login";
import SignUp from './Pages/Signup/Signup';
import PasswordReset from './Pages/PasswordReset/PasswordReset';
import HomePage from './pages/Home/HomePage';
import Settings from './Pages/Settings/Settings';

function App() {
  

  return (
    
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/resetpassword' element={<PasswordReset />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/Settings' element={<Settings />} />
        </Routes>
      </Router>
      
    
  );
}

export default App;

