import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { signOut } from "firebase/auth";
import { auth } from '../../../firebase.config';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "./style.css";

export default function Navbar() {
  const navigate = useNavigate();
  const handleRedirectToHome = () => {
    navigate("/home");
  };

  const handleRedirectToAbout = () => {
    navigate("/settings");
  };

  const handleRedirectToQuestions = () => {
    navigate("/questions");
  };


  const signoutUser = async () => {
    // call Firebase for logout
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className='navbar-container'>
        <div onClick={handleRedirectToHome} className='navbar-logo'>
        <Image src='..\src\logo\overstacklogo.png' width='200px' />
        </div>
        <div className='navbar-links'>
            <Button onClick={handleRedirectToAbout} link>Settings</Button>
            <Button onClick={handleRedirectToQuestions}  link>Questions</Button>
           
        </div>
        <div className='navbar-buttons'>
            
            <Button  onClick={signoutUser} className="p-button-outlined">Sign out</Button>
        </div>
    </div>
  );
}
