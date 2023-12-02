import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Panel } from 'primereact/panel';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import moment from 'moment/moment'
import { Timestamp, addDoc, collection, getDocs, orderBy, query, where, getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../firebase.config';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function QuestionPage() {
    const { postId } = useParams();

    const [ newComment, setNewComment ] = useState('');
    const [ currentQuestion, setCurrentQuestion ] = useState([]);
    const [ currentAuthor, setCurrentAuthor ] = useState([]);
    const [ currentComments, setCurrentComments ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const questionsCollection = collection(db, 'posts');
    const usersCollection = collection(db, 'users');
    const commentsCollection = collection(db, 'comments');

    const handleCommentChange = (value) => {
        setNewComment(value);
    }

    const generateCommentId = () => {
        return Math.floor(Math.random() * (1000000000 - 1)) + 1;
    }

    const handleSubmitComment = async () => {
        const author = await getCommentAuthorByRef(auth.currentUser.uid);

        const commentDb = {
            commentId: generateCommentId(),
            content: newComment,
            createdAt: Timestamp.fromDate(new Date()),
            isAnswer: false,
            postRef: Number(postId),
            author: author.userName
        }

        await addDoc(commentsCollection, commentDb);

        setCurrentComments([...currentComments, commentDb]);
        setNewComment('');
    }

    useEffect(() => {
        if (postId) {
            getQuestionByPostId(postId);
            getCommentsByPostId(postId);
        }
    }, [postId]);

    const modules = {
        syntax: true,
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],   

            ['clean']
        ]
    }

    const getCommentAuthorByRef = async (ref) => {
        try {
            const users = [];
            const userQuery = query(usersCollection, where('id', '==', ref));
            const userSnapshot = await getDocs(userQuery);
    
            userSnapshot.forEach((user) => {
                const data = user.data();
                users.push(data);
            });
    
            return users.length > 0 ? users[0] : null; // Return the first user found or null if no user is found
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getQuestionByPostId = async (postId) => {
        setIsLoading(true);
        try {
            const questions = [];
            const questionQuery = query(questionsCollection, where('postId', '==', Number(postId)));
            const questionsSnapshot = await getDocs(questionQuery);
            questionsSnapshot.docs.forEach((question) => {
                const data = question.data();
                questions.push(data);
            });
            setCurrentQuestion(...questions);
            setIsLoading(false);
        } catch (err) {
            console.log(error);
        }
    }

    const question = currentQuestion;

    const getCommentsByPostId = async(postId) => {
        setIsLoading(true);
        try {
            const comments = [];
            const commentQuery = query(commentsCollection, where('postRef', '==', Number(postId)));
            const commentSnapshot = await getDocs(commentQuery);
            commentSnapshot.docs.forEach((comment) => {
                const data = comment.data();
                comments.push(data);
            });

            console.log(comments);

            setCurrentComments(comments);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    if(isLoading) {
        return (
          <div className="flex flex-column gap-2 align-items-center">
            <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="5" fill="var(--surface-ground)" animationDuration="1s" />
            <h4>Loading...</h4>
          </div>
        )
    }

    const getPostedTime = (date) => {
        const postedDate = moment(date.toDate());
        return postedDate.fromNow();
    }

    return (
        <div className="container">
            <div className="p-grid p-justify-center">
                <div className="p-col-8">
                    <Card className="p-mb-3" style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <div>
                            <h1>{question.title}</h1>
                            <p style={{ marginBottom: '15px' }}>{question.description}</p>
                            <div className="p-d-flex p-flex-wrap">
                                {question.tags.map((tag, index) => (
                                    <Tag key={index} severity="info" value={tag} className="p-mr-2 p-mb-2" style={{ marginRight: '8px', marginBottom: '8px' }}></Tag>
                                ))}
                            </div>
                        </div>
                        <div style={{ position: 'absolute', bottom: '0px', right: '25px', display: 'flex', alignItems: 'center' }}>
                            <Avatar image="https://cdn.pixabay.com/photo/2018/09/14/23/28/avatar-3678347_1280.png" size="large" shape="circle" className="p-mr-2" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
                            <div>
                                <p style={{ margin: 0 }}>Posted: {getPostedTime(question.createdAt)}</p>
                            </div>
                        </div>
                    </Card>
    
                    <div style={{ marginBottom: '20px' }}></div>
    
                    <Panel>
                        {currentComments.map((comment) => (
                            <div key={comment.id} className="p-mb-2">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ margin: 0, marginRight: '10px' }}>{comment.id}</p>
                                    <p style={{ margin: 0 }}>{comment.content} - <a href={`#`}>{comment.author}</a> {getPostedTime(comment.createdAt)}</p>
                                </div>
                            </div>
                        ))}
                    </Panel>

                    <div className="p-fluid" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '30px' }}>
                            <ReactQuill
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Write your comment here..."
                                modules={modules}
                                style={{ height: '300px' }}
                            />
                        </div>
                        <Button label="Post Your Answer" onClick={handleSubmitComment} />
                    </div>
                </div>
            </div>
        </div>
    );
}