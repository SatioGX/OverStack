// SignupForm.js
import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import './SignupForm.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.css';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase.config';
import { getAuthErrorMessages } from "../../../utils";



function SignupForm() {

  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);


  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      );
      if (user) {
        setTimeout(() => {
          setIsLoading(false);
          alert("User Succesfully registered");
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      const errorMessage = getAuthErrorMessages(error.code);
      alert(errorMessage);
      setIsLoading(false);
    }
  };


  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">
            <div className="text-900 text-3xl font-medium mb-3">Sign Up for an Account</div>
          </div>

          <div>

            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText
              id="email"
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(event) => setRegisterData({ ...registerData, email: event.target.value })}
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

            <Button icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-user'} disabled={isLoading}  type="submit" label="Sign Up" className="w-full" />

            <Link to="/">Already have an account ?</Link>

          </div>
        </div>
      </div>

    </form>
  );

}
SignupForm.proptypes = {};

export default SignupForm;
