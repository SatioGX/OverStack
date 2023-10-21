import React from 'react';
import Navbar from '../../Components/Navbar/Navbar'
import SettingsForm from './SettingsForm';


function Settings() {
  return (
    <div>
      <Navbar />
        <div>
          <div className="settings-content">
            <SettingsForm/>
          </div>
        </div>
    </div>

  );
}

export default Settings;