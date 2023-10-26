import { useNavigate } from 'react-router-dom';
import WelcomeCard from '../../Components/WelcomeCard/WelcomeCard';
import './style.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleJoinCommunityClick = () => {
    navigate('/signup')
  }

  const handleSearchContentClick = () => {
    navigate('/questions') // to questions page 
  }

  // if (!Navbar) {
  //   return (
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //     >
  //       <CircularProgress size={40} />
  //     </Box>
  //   );
  // }
  return (
    <div>
       
        <div className="card-container">
            <WelcomeCard 
              buttonText="Join Our Community" 
              buttonType="primary" 
              handleButtonClick={handleJoinCommunityClick}
              icon="pi pi-user"
              message="Discover the optimal solution to your technical query while assisting others in resolving their own."
            />
            <WelcomeCard 
              buttonText="Search Contents" 
              buttonType="info" 
              handleButtonClick={handleSearchContentClick}
              icon="pi pi-search"
              isOutlined={true} 
              message="You are getting stuck at somewhere in your code ? Feel free to find answers and ask question" 
            />
        </div>
    </div>
  )
}
