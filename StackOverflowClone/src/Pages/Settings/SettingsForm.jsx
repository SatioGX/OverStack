import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.css';
import { getAuth, updateProfile } from "firebase/auth";
import './SettingsForm.css'; // Import your CSS file
import { AuthContext } from '../../App';
import useUploadFile from '../../hooks/useUploadFile';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { ProgressSpinner } from 'primereact/progressspinner';



function SettingsForm() {

  const userdata = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [allQuestions, setAllQuestions] = useState([]);
  const questionsCollection = collection(db, 'posts');

  // const {
  //   allowUploadImage,
  //   allowUploadImageURL,
  //   imageFile,
  //   imageURL,
  //   imageProgress,
  //   handleFileInputChange,
  //   setImageURL
  // } = useUploadFile('',  )
  const usersCollection = collection(db, 'users');

  const handleSettings = (event) => {
    event.preventDefault();

    setIsLoading(true);
    console.log("Settings Updated:", userInfo);
  };

  useEffect(() => {
    if(userdata.uid) {
      fetchUserData()
    }

  }, [userdata.uid]);

  const fetchUserData = async () => {
    setIsLoading(true)
    try {
      const userQuery = query(usersCollection, where('id', '==', userdata.uid));
      const userSnapshot = await getDocs(userQuery);
      let data;
      userSnapshot.forEach((doc) => {
        data = doc.data();
      })
      setUserInfo({
        name: data.userName,
        id: data.id,
        questionAsked: data.questionAsked,
        answers: data.answers,
        imageLink: data.imageLink
      });
      setIsLoading(false);
      if(userdata.uid){
        console.log(userdata.uid)
        fetchRecentPost()
      }
    } catch(error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  const fetchRecentPost = async () =>{
    setIsLoading(true);
    try{
      const newQuestions = [];
      const postQuery = query(questionsCollection, where('userRef', '==', userdata.uid));
      const postSnapshot = await getDocs(postQuery);
      let data;
      console.log(data)
      setIsLoading(false);
      postSnapshot.forEach((doc) => {
        data = doc.data();
        newQuestions.push(data);
        console.log(data)
        setAllQuestions(newQuestions);
        setIsLoading(false);
      });
    }catch(error){
      setIsLoading(false);
      console.log(error);
    }
  }

  if(isLoading) {
    return (
      <div className="flex flex-column gap-2 align-items-center">
        <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="5" fill="var(--surface-ground)" animationDuration="1s" />
        <h4>Loading...</h4>
      </div>
    )
  }
  console.log(userInfo)
  console.log(userdata);
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
      className="w-full read-only"
      value={userInfo.name}
    />
  </div>
  </label>

        <div className = "flex-container">
        <div className="flex-rectangle"></div>
        <div className= "flex-col" >

  <label className="flex-activity">Recent Post</label>
  <InputText
    id="activity"
    type="text"
    className="read-only"
    value={`${allQuestions[0].title} ${allQuestions[0].description}`}
  />


        </div>
        </div>


        <div className = "flex-container">
            <div className = "flex-panel margins">
                <label >Questions Answered:</label>
                <InputText
                id="name"
                type="text"
                className="read-only"
                value={userInfo.answers}
                />
            </div>


            <div className= "flex-panel margins">
                <label htmlFor="aboutMe">Questions Asked</label>
                <InputText
                id="name"
                type="text"
                className="read-only"
                value={userInfo.questionAsked}
                />
            </div>
        </div>

        {/* <div>
            <label>All Posts</label>
            <InputText
            id="repos"
            type="text"
            placeholder="Will Change"
            className="large-read-only"
          />
        </div> */}
        <div>
                <button className= "button">Save</button>
        </div>
    </form>
    </div>
  );
}

export default SettingsForm;
