import React, {useEffect, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {courseActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function CreateCourse() {

    const user = useSelector(state => state.authentication.user);
    const courseCreation = useSelector(state => state.courses.courseCreation);
    const dispatch = useDispatch();

    const [course, setCourse] = useState({
        title: '',
        description: 'Salut',
        author_id: user.id+'',
        tags: 'coucou',
        published: true,
        id_cat: '1'
    });

    const [quillDescription, setCourseDescription] = useState('');

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if(user.role !== 'ENSEIGNANT'){
            console.log("TODO : Redirect beacause user is " + user.role);
        }
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setCourse(course => ({ ...course, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        course.description = quillDescription;

        console.log(course);
        setSubmitted(true);
        if (course.title && course.description && course.author_id && course.published && course.id_cat) {
            dispatch(courseActions.postCourse(course));
        }
    }

    return (
        <div className="body">
            <form name="form" onSubmit={handleSubmit}>
            <h1>Créer un cours</h1>
            <hr/>
            
            <div className="form-group">
                <label>Titre du cours</label>
                <input type="text" name="title" value={course.title} onChange={handleChange} className={'form-control' + (submitted && !course.title ? ' is-invalid' : '')} placeholder="Titre du cours" />
                {submitted && !course.title &&
                <div className="invalid-feedback">Le titre de cours est requis</div>
                }
            </div>

            <label>Description du cours :</label>
            <ReactQuill theme="snow" value={quillDescription} onChange={setCourseDescription}/>
            <br/>
            <div className="form-group">
                <button className="btn btn-primary">
                    {courseCreation && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Valider
                </button>
                <Link to="/dashboard" className="btn btn-link">Annuler</Link>
            </div>
            </form>
        </div>
    );
}

export {CreateCourse};