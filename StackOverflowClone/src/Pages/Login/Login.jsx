/* Login.js */
import React from 'react';
import LoginForm from "./LoginForm";
import Navbar from '../../Components/Navbar/Navbar'
import './Login.css';

function Login() {
  return (
    <div>
      <Navbar />
        <div>
          <div className="login-content">
            <LoginForm />
          </div>
        </div>
    </div>

  );
}

export default Login;
