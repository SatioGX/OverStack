import PropTypes from 'prop-types'
import { Tag } from 'primereact/tag'
import './style.css'
import moment from 'moment/moment'
import { collection, getDocs, query, where } from '@firebase/firestore';
import { auth, db } from '../../../firebase.config';
import { useEffect, useState } from 'react';

export default function Question({ questionData }) {
    const [authorName, setAuthorName] = useState('');
    let date = moment(questionData.createdAt.toDate());
    const usersCollection = collection(db, 'users');
    const userQuery = query(usersCollection, where('id', '==', auth.currentUser.uid));

    useEffect(() => {
        fetchAuthorInfo();
    }, [])

    const fetchAuthorInfo = async () => {
        try {
            const userSnapshot = await getDocs(userQuery);
            userSnapshot.forEach(async (user) => {
                const data = user.data();
                setAuthorName(data.userName);
            })
        } catch(error) {
            console.log(error);
        }
    }
  return (
    <div className="grid w-full p-0 m-0">
        <div className="col-1 flex flex-column p-0 m-0 gap-4 align-items-start">
            <h6 className="text-sm m-0">{questionData.votes} votes</h6>
            <h6 className="text-sm m-0">{questionData.answers} answers</h6>
        </div>
        <div className="col-11 flex flex-column p-0 m-0 gap-4 align-items-start">
            <h4 className="text-left font-bold m-0 p-0">{questionData.title}</h4>
            <p dangerouslySetInnerHTML={{__html: `${questionData.description.slice(0, 150)}`}} className="text-sm m-0"/>
        </div>
        <div className="col-1 p-0 m-0"></div>
        <div className="col-11 grid px-2 py-0 m-0">
            <div className="col-8 flex p-0 m-0 gap-2 justify-content-start">
                {
                    questionData.tags && questionData.tags.map((tag, index) => {
                        return <Tag 
                                    key={index} 
                                    severity="info" 
                                    value={tag}
                                />
                    })
                }
            </div>
            <div className="col-4 flex p-0 m-0 gap-2 justify-content-end">
                <img 
                    className="avatar w-1rem" 
                    src={questionData.avatar ? questionData.avatar : "https://cdn.pixabay.com/photo/2018/09/14/23/28/avatar-3678347_1280.png"} 
                />
                <h6 className="text-sm font-bold">{authorName}</h6>
                <h6 className="text-sm">asked {date.fromNow()}</h6>
            </div>
        </div>
    </div>
    )
}

Question.propTypes = {
    questionData: PropTypes.object.isRequired
}