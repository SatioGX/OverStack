import React from 'react';
import './SignUpForm.css';
import { SignupForm } from "../Signup/SignUpForm"

function SignUp() {
  return (
    <div className="signup-container">
      <div className="signup-content">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignUp;

