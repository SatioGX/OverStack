import { Button } from 'primereact/button' 
import { Divider } from 'primereact/divider'
import { ProgressSpinner } from 'primereact/progressspinner';
import Question from '../../Components/Question/Question';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuestionsPage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentFilterTab, setCurrentFilterTab] = useState('Newest');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const questionsCollection = collection(db, 'posts');
  const tabList = [
    {
      name: 'Newest',
      icon: 'pi pi-clock icon',
      style: {
        backgroundColor: "var(--primary-color)", 
        color: "var(--highlight-bg)", 
        borderRadius: '50%' 
      }
    },
    {
      name: 'Unanswered',
      icon: 'pi pi-question-circle icon icon',
      style: {
        backgroundColor: "var(--primary-color)", 
        color: "var(--highlight-bg)", 
        borderRadius: '50%' 
      }
    },
    {
      name: 'Popularity',
      icon: 'pi pi-thumbs-up-fill icon'
    },
    {
      name: 'Minority',
      icon: 'pi pi-thumbs-down-fill icon'
    },
  ];

  useEffect(() => {
    switch(currentFilterTab) {
      case 'Newest':
        fetchNewestQuestion();
        break;
      case 'Unanswered':
        getUnansweredQuestions();
        break;
      case 'Popularity':
        getMostPopularity();
        break;
      case 'Minority':
        getLeastPopularity();
    }
  }, [currentFilterTab])

  const fetchNewestQuestion = async () => {
    setIsLoading(true);
    try {
      const newQuestions = [];
      const questionQuery = query(questionsCollection, orderBy('createdAt', 'desc'))
      const questionSnapshot = await getDocs(questionQuery);
      questionSnapshot.docs.forEach((question) => {
        const data = question.data();
        newQuestions.push(data);
      })
      setAllQuestions(newQuestions);
      setIsLoading(false);
    } catch(error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const getUnansweredQuestions = async () => {
    setIsLoading(true);
    try {
      const newQuestions = [];
      const questionQuery = query(questionsCollection, where('answers', '==', 0));
      const questionSnapshot = await getDocs(questionQuery);
      questionSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        newQuestions.push(data);
      })
      setAllQuestions(newQuestions);
      setIsLoading(false);
    } catch(error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const getMostPopularity = async () => {
    setIsLoading(true);
    try {
      const newQuestions = [];
      const questionQuery = query(questionsCollection, orderBy('votes', 'desc'))
      const questionSnapshot = await getDocs(questionQuery);
      questionSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        newQuestions.push(data);
      })
      setAllQuestions(newQuestions);
      setIsLoading(false);
    } catch(error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const getLeastPopularity = async () => {
    setIsLoading(true);
    try {
      const newQuestions = [];
      const questionQuery = query(questionsCollection, orderBy('votes'))
      const questionSnapshot = await getDocs(questionQuery);
      questionSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        newQuestions.push(data);
      })
      setAllQuestions(newQuestions);
      setIsLoading(false);
    } catch(error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const switchFilterTab = (tabName) => {
    setCurrentFilterTab(tabName)
  }

  if(isLoading) {
    return (
      <div className="flex flex-column gap-2 align-items-center">
        <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="5" fill="var(--surface-ground)" animationDuration="1s" />
        <h4>Loading...</h4>
      </div>
    )
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
        <p className="text-lg w-full font-normal">{allQuestions.length} questions</p>
        <div className="flex w-full justify-content-end m-0 p-0 p-buttonset">
          {
            tabList && tabList.map((tab, index) => {
              return (
                <Button 
                  onClick={() => switchFilterTab(tab.name)} 
                  key={index} 
                  text 
                  raised 
                  style={
                    currentFilterTab === tab.name ? { 
                      backgroundColor: "var(--primary-color", color: "white" 
                    } : ''
                  }
                  className='gap-1'
                >
                  <i 
                    className={tab.icon} 
                    style={tab.style && tab.style}
                  /> 
                  {tab.name}
                </Button>)
            })
          }
        </div>
      </div>
      <div className="flex flex-column w-full align-items-center px-8 py-0 m-0">
        {
          allQuestions.length > 0 && allQuestions.map((question, index) => {
            return (
              <React.Fragment key={index}>
                <Divider className="m-0" />
                <Question questionData={question} />
              </React.Fragment>
            )
          })
        }
        <Divider className="m-0" />
      </div>
    </div>
  )
}
