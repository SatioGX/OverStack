
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
//import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.css';
import './PasswordResetForm.css';

function PasswordResetForm() {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
   //const auth = getAuth();
    //sendPasswordResetEmail(auth, email)
        //.then(() => {
    // Alert(Password reset email sent!)
    // ..
  //})
  //.catch((error) => {
    //const errorCode = error.code;
    //const errorMessage = error.message;
    // ..
  //});
  };

  return (
   <form onChange={handlePasswordReset}>
    <div className="flex align-items-center justify-content-center">
  <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div className="text-center mb-5">
      <div className="text-900 text-3xl font-medium mb-3">Reset Your Password</div>
      <p>Enter the email address associated with your account, and we'll send you a link to reset your password.</p>
    </div>

    <div>
      <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
      <InputText
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3"
      />

      <Button type="submit" label="Reset Password" className="w-full" />
    </div>
  </div>
</div>
</form> 
  );
}

export default PasswordResetForm;

