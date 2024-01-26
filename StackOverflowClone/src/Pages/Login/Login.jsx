import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase.config';

import { Message } from 'primereact/message';
        




import './LoginForm.css'; // Import your CSS file



function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
 
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationMessage, setShowNotificationMessage] = useState("");


  const loginUser = async (event) => {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      setShowNotification(true);
      setShowNotificationMessage("Email or password missing");
      return;
    }

    setShowNotification(false);
    try {
      const data = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      if (data) {
        setShowNotification(true);
        setShowNotificationMessage("Succesfully Logged In");
        navigate("/home");
      }
    } catch (error) {
      setShowNotification(true);
      const errorCode= error.code
      const errormessage = error.message
      setShowNotificationMessage(errormessage);
    }
  };




  return (
    
    <div className='block-content' >
      <form onSubmit={loginUser} className="px-4 py-8 md:px-6 lg:px-8">
      
        <div className='flex align-items-center justify-content-center '>
          
          <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6 ">
            <div className="text-center mb-5 ">
              <img src='..\src\logo\overstacklogo.png'  alt="hyper" height={150} className="mb-3 imgs" />
              <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
              <span className="text-600 font-medium line-height-3">Don't have an account?</span>
              <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="/signup">Create today!</Link>
            </div>

            <div className='inputBox'>
              <label htmlFor="email" className="block text-900 font-medium mb-2 inputBox">Email</label>
              <InputText
                id="email"
                type="text"
                placeholder="Email address"
                className="w-full mb-3 inputBox"
                onChange={(event) =>
                  setLoginData({ ...loginData, email: event.target.value })
                }
                value={loginData.email}
                required
              />

              <label htmlFor="password" className="block text-900 font-medium mb-2 inputBox">Password</label>
              <InputText
                id="password"
                type="password"
                placeholder="Password"
                className="w-full mb-3"
                onChange={(event) =>
                  setLoginData({ ...loginData, password: event.target.value })
                }
                value={loginData.password}
                required
              />


              <Button label="Sign In"className="w-full " />
              <div>
                <Link className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer" to="/resetpassword">Forgot Password</Link>

              </div>

              {showNotification && (
                <div role='alert'>
                  <Message severity="info" text={showNotificationMessage} />
                </div>
              )}


            </div>
          </div>
        </div>
      
      </form>
    </div>
  );
}

export default Login;
