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
    <div class = "read-Only">
    <h1>Account Settings</h1>
    <form>
    <label htmlFor="name">Name:</label>
        <div class = "flex-container">
        <div class="flex-rectangle"></div>
        <div class = "flex-col"> 
            <label class = "flex-bio">Recent Activities</label>
            <textarea class="read-only">RECENT ACTIVITIES HERE</textarea>
        </div>
        </div>


        <div class = "flex-container">

            <div class = "flex-panel margins">
                <label htmlFor="location">Bio:</label>
                <textarea class="read-only">BIO HERE</textarea>
            </div>
            <div class = "flex-panel margins">
                <label htmlFor="website">Posts</label>
                <textarea class="read-only">POSTS HERE</textarea>
            </div>
            <div class = "flex-panel margins">
                <label htmlFor="aboutMe">Achievements</label>
                <textarea class="read-only">Achievements here</textarea>
            </div>
        </div>
 
        <div>
                <label htmlFor="aboutMe">Repos</label>
                <textarea class="read-only">Repos here</textarea>
        </div>
    </form>
    </div>
  );
}

export default SettingsForm;
