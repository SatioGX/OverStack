import { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Chips } from 'primereact/chips';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import ReactQuill from 'react-quill';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/vs2015.css'
import './CreatePostForm.css';

const CreatePostForm = () => {
    const [details, setDetails] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        message: '',
        on: false,
        type: 'error',
        summary: ''
    })
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const toast = useRef(null);
    const postCollection = collection(db, 'posts');

    useEffect(() => {
        if(notification.on) {
            toastShow();
        }
    }, [notification.on])
    
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

    const handleChangeDetails = (html) => {
        setDetails(html);
    }

    const handleChangeTags = (e) => {
        setTags(e.value);
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            details, 
            tags,
            title,
            createdAt: Timestamp.fromDate(new Date()),
            userRef: 'userId' // should be JSON.parse(localStorage.getItem(currentUser)).docId 
        }
        try {
            await addDoc(postCollection, data);
            setNotification({
                on: true,
                type: 'success',
                summary: 'Success',
                message: 'Post Added Successfully'
            })
            setTitle('');
            setDetails('');
            setTags([]);
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            setNotification({
                on: true,
                type: 'error',
                summary: 'Error',
                message: error.code
            })
        }
    };

    const toastShow = () => {
        toast.current.show(
            { 
                severity: notification.type, 
                summary: notification.summary, 
                detail: notification.message 
            }
        );
    };

    return (
        <form className="wide-form" onSubmit={handleFormSubmit}>
            <Toast ref={toast} />
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <InputText 
                    id="title" 
                    className="p-inputtext form-control" 
                    placeholder="What's your programming question? Be specific." 
                    value={title}
                    onChange={handleChangeTitle}
                />
            </div>
            <div className="form-group">
                <label htmlFor="detail">Details</label>
                <ReactQuill value={details} onChange={handleChangeDetails} modules={modules} />
            </div>
            <div className="card p-fluid form-group">
                <label htmlFor="tags">Tags</label>
                <Chips 
                    placeholder="Press Enter to separate tag"
                    value={tags} 
                    onChange={handleChangeTags} 
                />
            </div>
            <Button 
                className="p-button p-button-primary" 
                icon="pi pi-check" 
                label="Post Your Question" 
                loading={isLoading}
                type="submit" 
            />
        </form>
    );
}

export default CreatePostForm;