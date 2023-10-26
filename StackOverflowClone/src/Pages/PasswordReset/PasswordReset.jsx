import React from 'react';
import PasswordResetPageLayout from './PasswordResetPageLayout';
import PasswordResetForm from './PasswordResetForm';


function PasswordResetPage() {
  return (
    <div>

      <div>
        <PasswordResetPageLayout>
          <PasswordResetForm />
        </PasswordResetPageLayout>
      </div>
    </div>
  );
}

export default PasswordResetPage;
