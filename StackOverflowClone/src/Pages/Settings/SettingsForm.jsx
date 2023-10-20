import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.css';

import './SettingsForm.css'; // Import your CSS file

function SettingsForm() {
  console.log("SettingsForm rendered");
  const handleSettings = () => {
    // Implement your Settings logic here
  };
  return (
    <div>
    <h1>Account Settings</h1>
    <form>
        <h2>Profile Information</h2>
        <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
        </div>
        <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" />
        </div>
        <div>
            <label htmlFor="website">Website:</label>
            <input type="text" id="website" name="website" />
        </div>
        <div>
            <label htmlFor="aboutMe">About Me:</label>
            <textarea id="aboutMe" name="aboutMe"></textarea>
        </div>
 
        <div>
            <button type="submit">Save Changes</button>
        </div>
    </form>
    </div>
  );
}

export default SettingsForm;
