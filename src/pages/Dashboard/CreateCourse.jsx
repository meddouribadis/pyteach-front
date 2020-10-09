import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {userActions} from "../../_actions";

function CreateCourse() {
    const [course, setCourse] = useState({
        titleCourse: '',
        bodyCourse: '',
    });
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setCourse(course => ({ ...course, [name]: value }));
    }

    function handleBodyChange(e) {
        setCourse(course => ({ ...course, ['bodyCourse']: e }));
        console.log(course);
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        console.log(course);
    }

    return (
        <div className="body">
            <h1>Créer un cours</h1>
            <hr/>
            <div className="form-group">
                <label>Titre du cours</label>
                <input type="text" name="titleCourse" value={course.titleCourse} onChange={handleChange} className={'form-control' + (submitted && !course.titleCourse ? ' is-invalid' : '')} placeholder="Titre du cours" />
                {submitted && !course.titleCourse &&
                <div className="invalid-feedback">Le titre de cours est requis</div>
                }
            </div>

            <ReactQuill theme="snow" name="bodyCourse" value={course.bodyCourse} onChange={handleBodyChange}/>
        </div>
    );
}

export {CreateCourse};