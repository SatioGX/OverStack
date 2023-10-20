import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
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
    navigate("/about");
  };

  const handleRedirectToQuestions = () => {
    navigate("/questions");
  };

  const handleRedirectToTags = () => {
    navigate("/tags");
  };

  return (
    <div className="navbar-container">
      <div onClick={handleRedirectToHome} className="navbar-logo">
        <Image
          src="https://www.xda-developers.com/files/2017/05/stack-overflow.png"
          width="200px"
        />
      </div>
      <div className="navbar-links">
        <Button onClick={handleRedirectToAbout} link>
          About
        </Button>
        <Button onClick={handleRedirectToQuestions} link>
          Questions
        </Button>
        <Button onClick={handleRedirectToTags} link>
          Tags
        </Button>
      </div>
      <div className="navbar-searchBar">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search" className="w-full" />
        </span>
      </div>
      <div className="navbar-buttons">
        <Button>Log in</Button>
        <Button className="p-button-outlined">Sign up</Button>
      </div>
    </div>
  );
}
