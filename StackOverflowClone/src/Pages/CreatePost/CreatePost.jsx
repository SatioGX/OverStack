import React from 'react'
import CreatePostForm from './CreatePostForm'
import Navbar from '../../Components/Navbar/Navbar'
import './CreatePost.css'

function CreatePost() {
    return (
        <div>
        
            <div className="container">
                <h1>Create a New Question</h1>
                <CreatePostForm />
            </div>
        </div>
    );
}

export default CreatePost;