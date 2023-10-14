
import { useState } from 'react';
import { Button } from 'primereact/button';
import './PasswordResetForm.css';

function PasswordResetForm() {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    // Implement your password reset logic here
  };

  return (
    <form className="password-reset-form" onSubmit={handlePasswordReset}>
      <h1>Reset Your Password</h1>
      <p>Enter the email address associated with your account, and we&apos;ll send you a link to reset your password.</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Reset Password</Button>
    </form>
  );
}

export default PasswordResetForm;

