import React, {useEffect, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {courseActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

function CreateCourse() {

    const user = useSelector(state => state.authentication.user);
    const courseCreation = useSelector(state => state.courses.courseCreation);
    const dispatch = useDispatch();

    const [course, setCourse] = useState({
        title: '',
        description: '',
        author_id: user.id+'',
        tags: 'random',
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
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setCourse(course => ({ ...course, [name]: value }));
        console.log(course);
    }

    function handleSubmit(e) {
        e.preventDefault();
        course.description = quillDescription;

        setSubmitted(true);
        if (course.title && course.description && course.author_id && course.published && course.id_cat) {
            dispatch(courseActions.postCourse(course));
        }
    }

    return (
        <div className="row">
            <div className="col">
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

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" data-toggle="switch" name="published" checked={course.published} onChange={handleChange} id="publishedCheck" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Publié
                            </label>
                    </div>

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
        </div>
    );
}

function EditCourse() {

    const user = useSelector(state => state.authentication.user);
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();
    let { courseId } = useParams();

    const [course, setCourse] = useState(null);

    const [quillDescription, setCourseDescription] = useState(null);

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(courseActions.getById(courseId)).then((data, err) => {
            setCourse(data.course);
            setCourseDescription(data.course.description);
        });
    }, []);

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setCourse(course => ({ ...course, [name]: value }));
        console.log(course);
    }

    function handleSubmit(e) {
        e.preventDefault();
        course.description = quillDescription;

        setSubmitted(true);
        if (course.title && course.description && course.author_id && course.published && course.id_cat) {
            dispatch(courseActions.postCourse(course));
        }
    }

    return (
        <div className="row">
            <div className="col">
                {courses.loading && <em>Loading cours...</em>}
                {courses.error && <span className="text-danger">ERROR: {courses.error}</span>}
                {course !== null &&
                <form name="form" onSubmit={handleSubmit}>
                    <h1>Modifier le cours</h1>
                    <hr/>

                    <div className="form-group">
                        <label>Titre du cours</label>
                        <input type="text" name="title" value={course.title} onChange={handleChange}
                               className={'form-control' + (submitted && !course.title ? ' is-invalid' : '')}
                               placeholder="Titre du cours"/>
                        {submitted && !course.title &&
                        <div className="invalid-feedback">Le titre de cours est requis</div>
                        }
                    </div>

                    <label>Description du cours :</label>
                    <ReactQuill theme="snow" value={quillDescription} onChange={setCourseDescription}/>
                    <br/>

                    <div className="form-group">
                        <label>Catégorie</label>
                        <input type="text" name="id_cat" disabled={true} value={course.id_cat} onChange={handleChange}
                               className={'form-control' + (submitted && !course.id_cat ? ' is-invalid' : '')}
                               placeholder="Titre du cours"/>
                        {submitted && !course.id_cat &&
                        <div className="invalid-feedback">La catégorie du cours est requise</div>
                        }
                    </div>

                    <div className="form-group">
                        <label>Slug</label>
                        <input type="text" name="slug" disabled={true} value={course.slug} onChange={handleChange}
                               className={'form-control' + (submitted && !course.slug ? ' is-invalid' : '')}
                               placeholder="Titre du cours"/>
                        {submitted && !course.slug &&
                        <div className="invalid-feedback">Le slug du cours est requis</div>
                        }
                    </div>

                    <div className="form-group">
                        <label>Slug</label>
                        <input type="text" name="tags" value={course.tags} onChange={handleChange}
                               className={'form-control' + (submitted && !course.tags ? ' is-invalid' : '')}
                               placeholder="Titre du cours"/>
                        {submitted && !course.tags &&
                        <div className="invalid-feedback">Le tag du cours est requise</div>
                        }
                    </div>

                    <br/>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            Valider
                        </button>
                        <Link to="/dashboard/course/manage" className="btn btn-link">Annuler</Link>
                    </div>
                </form>
                }
            </div>
        </div>
    );
}

function ManageCourses(){
    const user = useSelector(state => state.authentication.user);
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(courseActions.getAll());
    }, []);

    return (
        <div className="row">
            <div className="col">
                <h1>Vos catégories</h1>
                <hr/>
                {courses.loading && <em>Loading cours...</em>}
                {courses.error && <span className="text-danger">ERROR: {courses.error}</span>}
                {courses.items &&
                <table className="table">
                    <thead className={"thead-dark"}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Auteur</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {courses.items.map((course, index) =>
                        <tr>
                            <th scope="row">{course.id_course}</th>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>{course.author_id}</td>
                            <td><Link to={{pathname: `/dashboard/course/edit/${course.id_course}`}} className="btn btn-primary">Modifier</Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
                }
            </div>
        </div>
    );
}

function SeeCourses(){
    const user = useSelector(state => state.authentication.user);
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(courseActions.getAll());
    }, []);

    return (
        <div className="row">
            <div className="col">
                <h1>Liste des cours</h1>
                <hr/>
                {courses.loading && <em>Loading cours...</em>}
                {courses.error && <span className="text-danger">ERROR: {courses.error}</span>}
                {courses.items &&
                <table className="table">
                    <thead className={"thead-dark"}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Auteur</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {courses.items.map((course, index) =>
                        <tr>
                            <th scope="row">{course.id_course}</th>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>{course.author_id}</td>
                            <td><Link to={{pathname: `/dashboard/course/edit/${course.id_course}`}} className="btn btn-primary">Afficher</Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
                }
            </div>
        </div>
    );
}

export {CreateCourse, EditCourse, ManageCourses, SeeCourses};