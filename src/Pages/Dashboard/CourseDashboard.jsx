import React, {useEffect, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {categoryActions, courseActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {history} from "../../_helpers";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import {DeleteModal} from "../../Components/Modal";

function CreateCourse() {

    const user = useSelector(state => state.authentication.user);
    const courseCreation = useSelector(state => state.courses.courseCreation);
    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();

    const [course, setCourse] = useState({
        title: '',
        description: '',
        author_id: user.id+'',
        tags: 'random',
        published: true,
        id_cat: ''
    });

    const [quillDescription, setCourseDescription] = useState('');

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(categoryActions.getAll());
    }, []);

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setCourse(course => ({ ...course, [name]: value }));
        console.log(course);
    }

    function handleChangeSelect(e) {
        const { name, value } = e.target;
        course.id_cat = value;
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
        <div className="container">
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

                        <div className="form-group">
                            <label>Catégorie du cours</label>
                            <select className={'form-control' + (submitted && !course.id_cat ? ' is-invalid' : '')} id="selectCourseId" name="id_cat" defaultValue={"none"} onChange={handleChangeSelect}>
                                <option value="none" disabled hidden></option>
                                {categories.items && categories.items.map((categorie, index) =>
                                    <option key={categorie.id_cat} value={categorie.id_cat+''}>{categorie.title}</option>
                                )}
                            </select>
                            {submitted && !course.id_cat &&
                            <div className="invalid-feedback">Merci de préciser la catégorie</div>
                            }
                        </div>

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
                            <button type={"button"} className="btn btn-link" onClick={history.goBack}>Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function EditCourse() {

    const user = useSelector(state => state.authentication.user);
    const courses = useSelector(state => state.courses);
    const categories = useSelector(state => state.categories);
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
        dispatch(categoryActions.getAll());
    }, []);

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setCourse(course => ({ ...course, [name]: value }));
        console.log(course);
    }

    function handleChangeSelect(e) {
        const { name, value } = e.target;
        course.id_cat = value;
    }

    function handleSubmit(e) {
        e.preventDefault();
        course.description = quillDescription;
        course.author_id = course.author_id+"";
        setSubmitted(true);
        if (course.title && course.description && course.author_id && course.published && course.id_cat) {
            dispatch(courseActions.putCourse(course));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {courses.loading && <em>Chargement...</em>}
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
                            <label>Catégorie du cours</label>
                            {categories.items &&
                                <select className={'form-control' + (submitted && !course.id_cat ? ' is-invalid' : '')} id="selectCourseId" name="id_cat" defaultValue={course.id_cat+""} onChange={handleChangeSelect}>
                                    <option value="none" disabled hidden></option>
                                    {categories.items.map((categorie, index) =>
                                        <option key={categorie.id_cat} value={categorie.id_cat}>{categorie.title}</option>
                                    )}
                                </select>
                            }
                            {submitted && !course.id_cat &&
                            <div className="invalid-feedback">Merci de préciser la catégorie</div>
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
                            <button type={"button"} className="btn btn-link" onClick={history.goBack}>Annuler</button>
                        </div>
                    </form>
                    }
                </div>
            </div>
        </div>
    );
}

function ManageCourses(){
    const user = useSelector(state => state.authentication.user);
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Table
    const columns = [
        {
            dataField: 'id_course',
            text: '#',
            sort: true
        }, {
            dataField: 'title',
            text: 'Titre',
            sort: true
        }, {
            dataField: 'description',
            text: 'Description',
            sort: false
        }, {
            dataField: 'author_id',
            text: 'Auteur',
            sort: true
        }, {
            text: "Action",
            dataField: "",
            formatter: GetActionFormat,
        }
    ];
    const { SearchBar } = Search;

    useEffect(() => {
        dispatch(courseActions.getAll());
    }, []);

    function handleDeleteButton(e){
        setSelectedCourse(e)
    }

    function confirmDelete(){
        if(selectedCourse) {
            dispatch(courseActions.delete(selectedCourse)).then((data, err) => {
                dispatch(courseActions.getAll());
            });
        }
    }

    function GetActionFormat(cell, row) {
        return (
            <div>
                <Link to={{pathname: `/dashboard/course/edit/${row.id_course}`}} className="btn btn-outline-primary btn-sm ts-buttom" size="sm">
                    Modifier
                </Link>
                <Link to={{pathname: `/dashboard/article/create/${row.id_course}`}} className="btn btn-outline-success btn-sm ml-2 ts-buttom" size="sm">
                    Ajouter article
                </Link>
                <button type="button" className="btn btn-outline-danger btn-sm mt-2 ts-buttom" size="sm" data-toggle="modal" data-target="#deleteCourseModal" onClick={handleDeleteButton(row.id_course)}>
                    Supprimer
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Vos cours</h1>
                    <hr/>
                </div>
                <div className="col-12">
                    {courses.loading && <em>Loading cours...</em>}
                    {courses.error && <span className="text-danger">ERROR: {courses.error}</span>}
                    {courses.items &&
                        <div className="list_courses">
                        <ToolkitProvider
                            keyField="id"
                            data={ courses.items }
                            columns={ columns }
                            search
                        >
                            {
                                props => (
                                    <div>
                                        <SearchBar { ...props.searchProps } />
                                        <BootstrapTable
                                            { ...props.baseProps }
                                            pagination={ paginationFactory() }
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                    </div>
                    }
                    <Link to={{pathname: "/dashboard/course/create"}} className="btn btn-primary">Créer un cours</Link>
                    <button type={"button"} className="btn btn-link" onClick={history.goBack}>Annuler</button>
                </div>
            </div>

            <DeleteModal idModal={"deleteCourseModal"} selectedArticle={selectedCourse} modalFunction={confirmDelete}/>
        </div>

    );
}



export {CreateCourse, EditCourse, ManageCourses};
