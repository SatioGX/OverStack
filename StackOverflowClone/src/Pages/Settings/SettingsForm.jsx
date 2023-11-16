import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.css';
import { getAuth, updateProfile } from "firebase/auth";
import './SettingsForm.css'; // Import your CSS file

function SettingsForm() {
  const [settingsData, setSettingsData] = useState({
    name: "",           // Add other settings fields as needed
    bio: "",
    posts: "",
    achievements: "",
    repos: "",
  });

  const handleSettings = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("Settings Updated:", settingsData);
  };


  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: auth.name,
    bio: auth.bio,
    posts: auth.posts,
    achievements: auth.achievements,
    repos: auth.repos
  }).then(() => {
    alert("User Succesfully Loaded");
  }).catch((error) => {
    const errorMessage = getAuthErrorMessages(error.code);
      alert(errorMessage);
  });
  

  return (
    <div>
    <h1>Account Settings</h1>
    <form onSubmit={handleSettings}>
    <label className="name-label">
  Name:
  <div className="name-box">
    <InputText
      id="name"
      type="text"
      placeholder="Enter your name"
      value={settingsData.name}
      onChange={(event) => setSettingsData({ ...settingsData, name: event.target.value })}
      className="w-full"
    />
  </div>
  </label>



        <div class = "flex-container">
        <div class="flex-rectangle"></div>
        <div class = "flex-col" > 
            <label class = "flex-activity">Recent Activities</label>
            <InputText
            id="activity"
            type="text"
            placeholder="Recent activity here"
            value={settingsData.activity}
            onChange={(event) => setSettingsData({ ...settingsData, activity: event.target.value })}
            class="read-only"
          />
        </div>
        </div>


        <div class = "flex-container">
            <div class = "flex-panel margins">
                <label >Bio:</label>
                <InputText
            id="bio"
            type="text"
            placeholder="bio here"
            value={settingsData.bio}
            onChange={(event) => setSettingsData({ ...settingsData, bio: event.target.value })}
            class="read-only"
          />
            </div>

            <div class = "flex-panel margins">
                <label>Posts</label>
                <InputText
            id="posts"
            type="text"
            placeholder="posts here"
            value={settingsData.bio}
            onChange={(event) => setSettingsData({ ...settingsData, post: event.target.value })}
            class="read-only"
          />
            </div>


            <div class = "flex-panel margins">
                <label htmlFor="aboutMe">Achievements</label>
                <InputText
            id="achievements"
            type="text"
            placeholder="achievements here"
            value={settingsData.bio}
            onChange={(event) => setSettingsData({ ...settingsData, achievements: event.target.value })}
            class="read-only"
          />
            </div>
        </div>
 
        <div>
            <label>Repos</label>
            <InputText
            id="repos"
            type="text"
            placeholder="repos here"
            value={settingsData.bio}
            onChange={(event) => setSettingsData({ ...settingsData, repos: event.target.value })}
            class="large-read-only"
          />
        </div>
        <div>
                <button class = "button">Save</button>
        </div>
    </form>
    </div>
  );
}

export default SettingsForm;
