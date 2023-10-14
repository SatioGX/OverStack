import React from 'react';
import LoginForm from "./LoginForm";





function Login() {
  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Log in to Stack Overflow</h1>
        <LoginForm /> 
        {/* Add more elements here */}
      </div>
    </div>
  );
}


export default Login;