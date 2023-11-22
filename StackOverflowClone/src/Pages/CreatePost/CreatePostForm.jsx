import { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Chips } from 'primereact/chips';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import ReactQuill from 'react-quill';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../firebase.config';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/vs2015.css'
import './CreatePostForm.css';

const CreatePostForm = () => {
    const [description, setDescription] = useState('');
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
    }, [notification])
    
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
    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(title.length === 0 || 
            description.length === 0 || 
            details.length === 0 || 
            tags.length === 0
        ) {
            setNotification({
                on: true,
                type: 'error',
                summary: 'Error',
                message: "Please fill out all blanks"
            })
            setIsLoading(false);
            return;
        }
        if(tags.length > 5) {
            setNotification({
                on: true,
                type: 'error',
                summary: 'Error',
                message: "5 tags maximum"
            })
            setIsLoading(false);
            return;
        }
        const data = {
            answer: 0,
            description,
            details, 
            tags,
            title,
            createdAt: Timestamp.fromDate(new Date()),
            votes: 0,
            userRef: auth.currentUser.uid
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
            setDescription('');
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
                <label htmlFor="decription">Description</label>
                <InputTextarea 
                    className="p-inputtext form-control" 
                    id="description" 
                    value={description}
                    onChange={handleChangeDescription}
                    placeholder="Describe your problem here." 
                />
            </div>
            <div className="form-group">
                <label htmlFor="detail">Details</label>
                <ReactQuill value={details} onChange={handleChangeDetails} modules={modules} />
            </div>
            <div className="card p-fluid form-group">
                <label htmlFor="tags">Tags</label>
                <Chips 
                    placeholder="Press Enter to separate tag (Add at least 1 tag, and maximum 5 tags)"
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