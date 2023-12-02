import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'
import WelcomeCard from '../../Components/WelcomeCard/WelcomeCard';
import { db } from '../../../firebase.config';
import { getDocs, query, where, collection } from 'firebase/firestore';
import './style.css';
import { AuthContext } from '../../App';

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [questionsAnswered, setAnswers] = useState(0)
  const userData = useContext(AuthContext);
  const user = userData;
  const usersCollection = collection(db, 'users');
  useEffect(() => {
    
    if(user.uid){
      fetchUserData();
    }
  }, [user.uid]);

  const fetchUserData = async () => {
    if (user) {
      try {
        const userQuery = query(usersCollection, where('id', '==', user.uid));
        const userSnapshot = await getDocs(userQuery)
        let data;
        userSnapshot.forEach((doc) => {
          data = doc.data()
        })


        setUserName(data.userName || '');
        setQuestionsAsked(data.questionsAsked || 0);
        setAnswers(data.answers || 0)

      } catch (error) {
        // Handle any errors that occur during data retrieval
        console.error('Error fetching user data:', error);
      }
    }
  }
 
  return (
    <div>
       
       <div className="card-container">
        <WelcomeCard
          icon="pi pi-user"
          buttonText="Update User"
          buttonType="Primary"
          handleButtonClick={() => navigate('/settings')}
          message={`Welcome, ${userName}`}
          isOutlined={true}
        />
        <WelcomeCard
          buttonText="Search Questions"
          buttonType="info"
          handleButtonClick={() => navigate('/questions')}
          icon="pi pi-search"
          isOutlined={true}
          message="You are getting stuck at somewhere in your code? Feel free to find answers and ask questions."
        />
        <WelcomeCard
          icon="pi pi-search"
          isOutlined={true}
          message={`Questions Asked: ${questionsAsked}\nQuestions Answered: ${questionsAnswered}`}
          buttonType="info"
          handleButtonClick={() => navigate('/questions')}
          buttonText=' '
        />
      </div>
    </div>
  )
}
export default HomePage;
