import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.css';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase.config';
import { getAuthErrorMessages } from '../../../utils'


import './loginForm.css'; // Import your CSS file

function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      if (user) {
        setTimeout(() => {
          setIsLoading(false);
          localStorage.setItem('currentUser', JSON.stringify(user));
          alert('User Successfully Logged In');
          navigate('/home');
        }, 2000);
      }
    } catch (error) {
      const errorMessage = getAuthErrorMessages(error.code);
      alert(errorMessage);
      setIsLoading(false);
    }
  }


  return (
    <form onSubmit={loginUser}>
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">

            <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>

          </div>

          <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText
              id="email"
              type="text"
              placeholder="Email address"
              className="w-full mb-3"
              onChange={(event) =>
                setLoginData({ ...loginData, email: event.target.value })
              }
              value={loginData.email}
              required
            />

            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
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


            <Button label="Sign In"   icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-user'} disabled={isLoading} className="w-full" />
            <div>
              <Link className="text-600 font-medium line-height-3" to="/resetpassword">Forgot Password</Link>

            </div>
            <Link className="text-600 font-medium line-height-3" to="/signup">Don&apos;t have an account</Link>

          </div>
        </div>
      </div>
    </form>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
