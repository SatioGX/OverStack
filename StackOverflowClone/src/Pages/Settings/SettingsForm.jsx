import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FileUpload } from 'primereact/fileupload';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import './SettingsForm.css';
import { AuthContext } from '../../App';

function SettingsForm() {
  const userdata = useContext(AuthContext);
  const questionsCollection = collection(db, 'posts');
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [allQuestions, setAllQuestions] = useState([]);




  const usersCollection = collection(db, 'users');

  const handleSettings = (event) => {
    event.preventDefault();

    setIsLoading(true);
    console.log("Settings Updated:", userInfo);
  };

  useEffect(() => {
    if (userdata.uid) {
      fetchUserData();
    }
  }, [userdata.uid]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const userQuery = query(usersCollection, where('id', '==', userdata.uid));
      const userSnapshot = await getDocs(userQuery);
      let data;
      userSnapshot.forEach((doc) => {
        data = doc.data();
      });
      setUserInfo({
        name: data.userName,
        id: data.id,
        questionAsked: data.questionAsked,
        answers: data.answers,
        imageLink: data.imageLink,
      });
      setIsLoading(false);
      if (userdata.uid) {
        console.log(userdata.uid);
        fetchRecentPost();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const fetchRecentPost = async () => {
    setIsLoading(true);
    try {
      const newQuestions = [];
      const postQuery = query(questionsCollection, where('userRef', '==', userdata.uid));
      const postSnapshot = await getDocs(postQuery);
      let data;
      console.log(data);
      setIsLoading(false);
      postSnapshot.forEach((doc) => {
        data = doc.data();
        newQuestions.push(data);
        console.log(data);
        setAllQuestions(newQuestions);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-column gap-2 align-items-center">
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="5" fill="var(--surface-ground)" animationDuration="1s" />
        <h4>Loading...</h4>
      </div>
    );
  }
  console.log(userInfo);
  console.log(userdata);
  console.log(questionsCollection);
  return (
    <div>
      <h1>Account Settings</h1>
      <form onSubmit={handleSettings}>
        <div className="flex-container">

  <img
    src="https://images.pexels.com/photos/19210033/pexels-photo-19210033/free-photo-of-close-up-of-a-mallard-duck.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="Placeholder"
    style={{ width: '100px', height: '150px' }}
  />


          <div className="name-email-container">
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

            <label className="name-label">
              Email:
              <div className="email-box">
                <InputText
                  id="email"
                  type="text"
                  className="w-full read-only"
                  value={userdata.email}
                />
              </div>
            </label>
          </div>
        </div>

        <div className="flex-col">
          <label className="flex-activity">Recent Post</label>
          <textarea
            id="activity"
            className="read-only"
            // value={`${allQuestions[0].title}\n${allQuestions[0].description}\n${allQuestions[0].details}\n${"Tags: " + allQuestions[0].tags}\n${"Date Posted: " + allQuestions[0].createdAt.toDate().toDateString()}`}
            readOnly
          />
        </div>

          <div className="flex-panel margins">
            <label>Questions Answered:</label>
            <InputText
              id="name"
              type="text"
              className="read-only"
              value={userInfo.answers}
            />
          </div>

          <div className="flex-panel margins">
            <label htmlFor="aboutMe">Questions Asked</label>
            <InputText
              id="name"
              type="text"
              className="read-only"
              value={userInfo.questionAsked}
            />
          </div>

      </form>
    </div>
  );
}

export default SettingsForm;
