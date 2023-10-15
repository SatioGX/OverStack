/* SignUp.js */
import React from 'react';
import SignUpForm from "./SignUpForm";
import './SignUpForm.css';
import Navbar from '../../Components/Navbar/Navbar'

function SignUp() {
  return (
    
    <div className="signup-container">
      <Navbar />
      <div className="signup-content">
        
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
