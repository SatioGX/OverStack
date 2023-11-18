import { Button } from 'primereact/button' 
import { Divider } from 'primereact/divider'
import Question from '../../Components/Question/Question';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuestionsPage() {
  const [currentFilterTab, setCurrentFilterTab] = useState('Newest');
  const [allQuestions, setAllQuestions] = useState([]);
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
        fetchUnansweredQuestions();
        break;
    }
  }, [currentFilterTab])

  const fetchNewestQuestion = async () => {
    try {
      const newQuestions = [];
      const questionQuery = query(questionsCollection, orderBy('createdAt', 'desc'))
      const questionSnapshot = await getDocs(questionQuery);
      questionSnapshot.docs.forEach((question) => {
        const data = question.data();
        newQuestions.push(data);
      })
      setAllQuestions(newQuestions);
    } catch(error) {
      console.log(error);
    }
  }

  const fetchUnansweredQuestions = () => {
    const unansweredQuestions = allQuestions.filter((question) => {
      return !question.answer;
    })
    setAllQuestions(unansweredQuestions);
  }

  const switchFilterTab = (tabName) => {
    setCurrentFilterTab(tabName)
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
          {
            tabList && tabList.map((tab, index) => {
              return (
                <Button 
                  onClick={() => switchFilterTab(tab.name)} 
                  key={index} 
                  text 
                  raised 
                  style={currentFilterTab === tab.name ? {backgroundColor: "var(--primary-color", color: "white"} : ''}
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
