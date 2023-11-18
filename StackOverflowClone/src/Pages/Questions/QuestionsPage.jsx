import { Button } from 'primereact/button' 
import { Divider } from 'primereact/divider'
import Question from '../../Components/Question/Question';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuestionsPage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const navigate = useNavigate();
  const questionsCollection = collection(db, 'posts');
  
  useEffect(() => {
    fetchAllQuestions();
  }, [])

  const fetchAllQuestions = async () => {
    try {
      const newQuestions = [];
      const questionSnapshot = await getDocs(questionsCollection);
      questionSnapshot.docs.forEach((question) => {
        const data = question.data();
        newQuestions.push(data);
      })
      setAllQuestions(newQuestions);
    } catch(error) {
      console.log(error);
    }
  }
  
  return (
    <div className="flex flex-column gap-2 px-8 mt-2 align-items-start">
      <div className="flex w-full justify-content-between px-8 py-0">
        <h2 className="text-xl font-bold">All Questions</h2>
        <Button 
          className="w-auto" 
          severity="info"
          onClick={() => navigate('/createpost')}
        >
          Ask Question +
        </Button>
      </div>
      <div className="flex w-full m-0 px-8 py-0">
        <p className="text-lg w-full font-normal">2000 questions</p>
        <div className="flex w-full justify-content-end m-0 p-0 p-buttonset">
          <Button text raised className="gap-1">
            <i 
              className="pi pi-clock icon" 
              style={{backgroundColor: "var(--primary-color)", color: "var(--highlight-bg)", borderRadius: '50%' }} 
            /> 
            Newest
          </Button>
          <Button text raised className="gap-1">
            <i 
              className="pi pi-question-circle icon" 
              style={{backgroundColor: "var(--primary-color)", color: "var(--highlight-bg)", borderRadius: '50%'}} 
            /> 
            Unanswered
          </Button>
          <Button text raised className="gap-1"><i className="pi pi-thumbs-up-fill icon" />
            Most votes
          </Button>
          <Button text raised className="gap-1"><i className="pi pi-thumbs-down-fill icon" />
            Least votes
          </Button>
        </div>
      </div>

      <div className="flex flex-column w-full align-items-center px-8 py-0 m-0">
        {
          allQuestions.length > 0 && allQuestions.map((question) => {
            return (
              <>
                <Divider className="m-0" />
                <Question questionData={question} />
              </>
            )
          })
        }
        <Divider className="m-0" />
      </div>
    </div>
  )
}
