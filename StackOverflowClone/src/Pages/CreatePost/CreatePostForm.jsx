import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/vs2015.css'
import './CreatePostForm.css';

const CreatePostForm = () => {
    const [text,setText] = useState('');
    
    const handleChange = (html) => {
        setText(html);
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className="wide-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <InputText 
                    className="p-inputtext form-control" 
                    id="title" 
                    placeholder="What's your programming question? Be specific." 
                />
            </div>
            <div className="form-group">
                <label htmlFor="decription">Description</label>
                <InputTextarea 
                    className="p-inputtext form-control" 
                    id="description" 
                    placeholder="What's your programming question? Be specific." 
                />
            </div>
            <div className="form-group">
                <label htmlFor="details">Details</label>
                <ReactQuill id="details" value={text} onChange={handleChange} modules={modules} />
            </div>
            <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <InputText 
                    id="tags" 
                    className="p-inputtext form-control" 
                    placeholder="at least one tag such as (r vb .net wordpress), max 5 tags"
                />
            </div>
            <Button 
                type="submit" 
                label="Post Your Question" 
                className="p-button p-button-primary" 
            />
        </form>
    );
}

export default CreatePostForm;