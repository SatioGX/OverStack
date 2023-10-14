import React, { useState } from 'react';
import { Button } from 'primereact/button';
import './loginForm.css'; // Import your CSS file

function LoginForm() {
  console.log("LoginForm rendered");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h1>Log in to Stack Overflow</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Log In</Button>
      <p>
        <a href="#">Forgot password?</a> or <a href="#">Sign up</a>
      </p>
    </form>
  );
}

export default LoginForm;
