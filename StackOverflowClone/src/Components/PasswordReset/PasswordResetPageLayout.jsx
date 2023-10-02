
import React from 'react';

function PasswordResetPageLayout({ children }) {
  return (
    <div className="password-reset-page">
      <div className="password-reset-container">
        {children}
      </div>
    </div>
  );
}

export default PasswordResetPageLayout;
