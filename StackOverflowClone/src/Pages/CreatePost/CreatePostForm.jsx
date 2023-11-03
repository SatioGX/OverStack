import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/vs2015.css'
import './CreatePostForm.css';

const CreatePostForm = () => {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    
    const handleChangeDescription = (html) => {
        setDescription(html);
    }

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
    console.log(description)
    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className="wide-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <InputText 
                id="title" className="p-inputtext form-control" placeholder="What's your programming question? Be specific." />
            </div>
            <div className="form-group">
                <ReactQuill value={description} onChange={handleChangeDescription} modules={modules} />
            </div>
            <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <InputText id="tags" className="p-inputtext form-control" placeholder="at least one tag such as (r vb .net wordpress), max 5 tags"/>
            </div>
            <Button type="submit" label="Post Your Question" className="p-button p-button-primary" />
        </form>
    );
}

export default CreatePostForm;