import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import './SignupForm.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.css';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../../firebase.config';
import { addDoc, collection } from "firebase/firestore";
import { Message } from 'primereact/message';


function SignUp() {
  
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    userName: "",
    confirmPassword: "",
  });

  const userReference = collection(db, 'users');

  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationMessage, setShowNotificationMessage] = useState("");
  const navigate= useNavigate();




  const handleSignup = async (event) => {
    event.preventDefault();

    if (!registerData.email || !registerData.password ||  !registerData.confirmPassword || !registerData.userName) {
      setShowNotification(true);
      setShowNotificationMessage("Email, password or confirm password missing");
      return;
  }

  if (registerData.password !== registerData.confirmPassword) {
    setShowNotification(true);
    setShowNotificationMessage("Passwords dont match");
    return;
  }

  setShowNotification(false);
  try{
    const data = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
    
    if (data) {
      
      await addDoc(userReference, {
        userName: registerData.userName,
        id: data.user.uid,
        questionsAsked: 0,
        answers: 0
      });
      setShowNotification(true);
      setShowNotificationMessage('Succesfully Registered');
      navigate('/');
    }
  } catch (error){
    setShowNotification(true);
      const errorCode= error.code
      const errormessage = error.message
      setShowNotificationMessage(errormessage);
  }
}


  return (
    <div className='block-content' >
    <form className="signup-form" onSubmit={handleSignup}>
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5 ">
            <img src='..\src\logo\overstacklogo.png'  alt="hyper" height={150} className="mb-3 imgs" />
            <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
            <span className="text-600 font-medium line-height-3">Create an Account</span>
          </div>

          <div className='inputBox'>
            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText
              id="email"
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(event) => setRegisterData({ ...registerData, email: event.target.value })}
              className="w-full mb-3"
            />

            
            <label htmlFor="userName" className="block text-900 font-medium mb-2">Username</label>
            <InputText
              id="username"
              type="username"
              placeholder="Username"
              value={registerData.userName}
              onChange={(event) => setRegisterData({ ...registerData, userName: event.target.value })}
              className="w-full mb-3"
            />

            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
            <Password
              id="password"
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(event) => setRegisterData({ ...registerData, password: event.target.value })}
              className="w-full mb-3"
            />

            <label htmlFor="password" className="block text-900 font-medium mb-2">Confirm Password</label>
            <Password
              id="password"
              type="password"
              placeholder="Password"
              value={registerData.confirmPassword}
              onChange={(event) => setRegisterData({ ...registerData, confirmPassword: event.target.value })}
              className="w-full mb-3"
            />

            <Button type="submit" label="Sign Up" className="w-full" />

            <Link to="/">Already have an account ?</Link>

          </div>
          {showNotification && (
                <div role='alert'>
                  <Message severity="info" text={showNotificationMessage} />
                </div>
              )}
        </div>
      </div>

    </form>
    </div>
  );

}

export default SignUp;

