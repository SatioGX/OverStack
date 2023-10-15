// SignupForm.js
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import './SignupForm.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.css';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Implement your signup logic here
  };

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <div className="flex align-items-center justify-content-center">
  <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div className="text-center mb-5">
      <div className="text-900 text-3xl font-medium mb-3">Sign Up for an Account</div>
    </div>

    <div>
      <label htmlFor="name" className="block text-900 font-medium mb-2">Name</label>
      <InputText
        id="name"
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3"
      />

      <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
      <InputText
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3"
      />

      <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
      <Password
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3"
      />

      <Button type="submit" label="Sign Up" className="w-full" />
    </div>
  </div>
</div>

    </form>
  );
}

export default SignupForm;
