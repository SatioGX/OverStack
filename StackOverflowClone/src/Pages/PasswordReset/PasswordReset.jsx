import React from 'react';
import PasswordResetPageLayout from './PasswordResetPageLayout';
import PasswordResetForm from './PasswordResetForm';
import Navbar from '../../Components/Navbar/Navbar'

function PasswordResetPage() {
  return (
    <div>
  <Navbar />
  <div>
    <PasswordResetPageLayout>
      <PasswordResetForm />
    </PasswordResetPageLayout>
  </div>
  </div>
  );
}

export default PasswordResetPage;
