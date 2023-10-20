import React, { useState } from "react";

import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import './CreatePostForm.css'

// TODO: Add text styling options. Still seeking options for this feature however it's looking
// like it will be quill since it's compatible.

function CreatePostForm() {
    const [title] = useState('');
    const [question] = useState('');
    const [tags] = useState([]);

    const handlePost = () => {

    }

    return (
        <form className="wide-form">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <InputText id="title" className="p-inputtext form-control" placeholder="What's your programming question? Be specific." />
            </div>
            <div className="form-group">
                <InputTextarea id="body" rows={5} className="p-inputtext form-control" />
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