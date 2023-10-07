import React from 'react';
import SignupForm from "./SignupForm";





function SignUp() {
  return (
    <div className="Signup-container">
      <div className="Signup-content">
        <h1>Sign Up to Stack Overflow</h1>
        <SignupForm /> {/* Ensure this is present */}
        {/* Add more elements here */}
      </div>
    </div>
  );
}


export default SignUp;