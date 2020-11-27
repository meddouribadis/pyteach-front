import React, {useEffect, useState} from "react";
import ReactQuill from 'react-quill';
import {courseActions, articleActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {history} from "../../_helpers";
import {DeleteModal} from "../../Components/Modal";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import 'react-quill/dist/quill.snow.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import {Skulpt, SkulptPreview} from "../../Components/Skulpt";


function CreateArticle() {

    const user = useSelector(state => state.authentication.user);
    const courses = useSelector(state => state.courses);
    const articleCreation = useSelector(state => state.articles.articleCreation);
    const dispatch = useDispatch();
    let { courseId } = useParams();

    const [course, setCourse] = useState(null);
    const [article, setArticle] = useState({
        title: '',
        description: '',
        id_course: '',
        body: '',
        position: '',
        isPublished: true,
        isExercice: false,
    });
    const [quillDescription, setArticleBody] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(courseActions.getById(courseId)).then((data, err) => {
            setCourse(data.course);
            article.id_course = data.course.id_course;
        });
    }, []);

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setArticle(course => ({ ...course, [name]: value }));
        console.log(article);
    }

    function handleChangeSelect(e) {
        const { name, value } = e.target;
    }

    function handleSubmit(e) {
        e.preventDefault();
        article.body = quillDescription;
        setSubmitted(true);
        if (article.title && article.description && article.id_course && article.position && article.position && article.body) {
            dispatch(articleActions.postArticle(article));
        }
    }

    function handleSubmitExercice(e) {
        e.preventDefault();
        article.isExercice = true;
        setSubmitted(true);
        if (article.title && article.description && article.id_course && article.position && article.position && article.body) {
            dispatch(articleActions.postArticle(article));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {courses.loading && <em>Chargement...</em>}
                    {courses.error && <span className="text-danger">ERROR: {courses.error}</span>}
                    {course !== null &&
                        <div>
                            <h1>Créer un article</h1>
                            <hr/>

                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="pills-chapitre-tab" data-toggle="pill" href="#pills-chapitre"
                                       role="tab" aria-controls="pills-chapitre" aria-selected="true">Chapitre</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="pills-exercice-tab" data-toggle="pill" href="#pills-exercice"
                                       role="tab" aria-controls="pills-exercice" aria-selected="false">Exercice</a>
                                </li>
                            </ul>

                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-chapitre" role="tabpanel" aria-labelledby="pills-chapitre-tab">
                                    <form name="form" onSubmit={handleSubmit}>

                                        <div className="form-group">
                                            <label>Titre de l'article</label>
                                            <input type="text" name="title" value={article.title} onChange={handleChange} className={'form-control' + (submitted && !article.title ? ' is-invalid' : '')} placeholder="Titre du cours" />
                                            {submitted && !article.title &&
                                            <div className="invalid-feedback">Le titre de l'article est requis</div>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label>Description de l'article</label>
                                            <input type="text" name="description" value={article.description} onChange={handleChange} className={'form-control' + (submitted && !article.description ? ' is-invalid' : '')} placeholder="Description" />
                                            {submitted && !article.description &&
                                            <div className="invalid-feedback">La description de l'article est requise</div>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label>Position de l'article</label>
                                            <input type="text" name="position" value={article.position} onChange={handleChange} className={'form-control' + (submitted && !article.position ? ' is-invalid' : '')} placeholder="Pos" />
                                            {submitted && !article.position &&
                                            <div className="invalid-feedback">La position de l'article est requise</div>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label>ID Cours</label>
                                            <input disabled={true} type="text" name="id_course" value={course.id_course} onChange={handleChange} className={'form-control' + (submitted && !article.id_course ? ' is-invalid' : '')} placeholder="ID_Cours" />
                                            {submitted && !article.id_course &&
                                            <div className="invalid-feedback">La id_course de l'article est requise</div>
                                            }
                                        </div>

                                        <label>Corps de l'article :</label>
                                        <ReactQuill theme="snow" value={quillDescription} onChange={setArticleBody}/>
                                        <br/>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" data-toggle="switch" name="isPublished" checked={article.isPublished} onChange={handleChange} id="publishedCheck" />
                                            <label className="form-check-label" htmlFor="defaultCheck1">
                                                Publié
                                            </label>
                                        </div>

                                        <br/>
                                        <div className="form-group">
                                            <button className="btn btn-primary">
                                                {articleCreation && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                Valider
                                            </button>
                                            <button type={"button"} className="btn btn-link" onClick={history.goBack}>Annuler</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="tab-pane fade" id="pills-exercice" role="tabpanel" aria-labelledby="pills-exercice-tab">
                                    <form name="form" onSubmit={handleSubmitExercice}>

                                        <div className="form-group">
                                            <label>Titre de l'exercice</label>
                                            <input type="text" name="title" value={article.title} onChange={handleChange} className={'form-control' + (submitted && !article.title ? ' is-invalid' : '')} placeholder="Titre du cours" />
                                            {submitted && !article.title &&
                                            <div className="invalid-feedback">Le titre de l'exercice est requis</div>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label>Description de l'exercice</label>
                                            <input type="text" name="description" value={article.description} onChange={handleChange} className={'form-control' + (submitted && !article.description ? ' is-invalid' : '')} placeholder="Description" />
                                            {submitted && !article.description &&
                                            <div className="invalid-feedback">La description de l'exercice est requise</div>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label>Position de l'exercice</label>
                                            <input type="text" name="position" value={article.position} onChange={handleChange} className={'form-control' + (submitted && !article.position ? ' is-invalid' : '')} placeholder="Position" />
                                            {submitted && !article.position &&
                                            <div className="invalid-feedback">La position de l'exercice est requise</div>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label>ID Cours</label>
                                            <input disabled={true} type="text" name="id_course" value={course.id_course} onChange={handleChange} className={'form-control' + (submitted && !article.id_course ? ' is-invalid' : '')} placeholder="ID_Cours" />
                                            {submitted && !article.id_course &&
                                            <div className="invalid-feedback">L'id_course de l'exercice est requis !</div>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label>Contenu de l'exercice</label>
                                            <textarea name="body" className={'form-control' + (submitted && !article.body ? ' is-invalid' : '')} value={course.body} onChange={handleChange} id="body" rows="3" placeholder="Code qui sera executé"></textarea>
                                            {submitted && !article.body &&
                                            <div className="invalid-feedback">Le contenu de l'exercice est requis !</div>
                                            }
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" data-toggle="switch" name="isPublished" checked={article.isPublished} onChange={handleChange} id="publishedCheck" />
                                            <label className="form-check-label" htmlFor="defaultCheck1">
                                                Publié
                                            </label>
                                        </div>

                                        <br/>
                                        <div className="form-group">
                                            <button className="btn btn-primary">
                                                {articleCreation && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                Valider
                                            </button>
                                            <button type={"button"} className="btn btn-link" onClick={history.goBack}>Annuler</button>
                                        </div>
                                    </form>
                                    <hr/>
                                    <h4>Prévisualisation de l'exercice</h4>
                                    <SkulptPreview pythonCode={article.body}/>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

function EditArticle() {

    const user = useSelector(state => state.authentication.user);
    const courses = useSelector(state => state.courses);
    const articles = useSelector(state => state.articles);
    const articleUpdate = useSelector(state => state.articles.articleUpdate);
    const dispatch = useDispatch();
    let { articleId } = useParams();

    const [article, setArticle] = useState(null);
    const [quillDescription, setArticleBody] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        dispatch(articleActions.getById(articleId)).then((data, err) => {
            setArticle(data.article);
            setArticleBody(data.article.body);
        });
        dispatch(courseActions.getAll());
    }, []);

    function handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setArticle(course => ({ ...course, [name]: value }));
        console.log(article);
    }

    function handleChangeSelect(e) {
        const { name, value } = e.target;
    }

    function handleSubmit(e) {
        e.preventDefault();
        article.body = quillDescription;
        if(article.imageUrl === null) delete article.imageUrl;
        if(article.videoUrl === null) delete article.videoUrl;
        setSubmitted(true);
        if (article.title && article.description && article.id_course && article.position && article.position && article.body) {
            dispatch(articleActions.putArticle(article));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {articles.loading && <em>Chargement...</em>}
                    {articles.error && <span className="text-danger">ERROR: {articles.error}</span>}
                    {article !== null &&
                        <form name="form" onSubmit={handleSubmit}>
                        <h1>Modifier un article</h1>
                        <hr/>

                        <div className="form-group">
                            <label>Titre de l'article</label>
                            <input type="text" name="title" value={article.title} onChange={handleChange} className={'form-control' + (submitted && !article.title ? ' is-invalid' : '')} placeholder="Titre du cours" />
                            {submitted && !article.title &&
                            <div className="invalid-feedback">Le titre de l'article est requis</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>Description de l'article</label>
                            <input type="text" name="description" value={article.description} onChange={handleChange} className={'form-control' + (submitted && !article.description ? ' is-invalid' : '')} placeholder="Description" />
                            {submitted && !article.description &&
                            <div className="invalid-feedback">La description de l'article est requise</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>Position de l'article</label>
                            <input type="text" name="position" value={article.position} onChange={handleChange} className={'form-control' + (submitted && !article.position ? ' is-invalid' : '')} placeholder="Pos" />
                            {submitted && !article.position &&
                            <div className="invalid-feedback">La position de l'article est requise</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>ID Cours</label>
                            <input disabled={true} type="text" name="id_course" value={article.id_course} onChange={handleChange} className={'form-control' + (submitted && !article.id_course ? ' is-invalid' : '')} placeholder="ID_Cours" />
                            {submitted && !article.id_course &&
                            <div className="invalid-feedback">La id_course de l'article est requise</div>
                            }
                        </div>

                        <label>Corps de l'article :</label>
                        <ReactQuill theme="snow" value={quillDescription} onChange={setArticleBody}/>
                        <br/>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" data-toggle="switch" name="isPublished" checked={article.isPublished} onChange={handleChange} id="publishedCheck" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Publié
                            </label>
                        </div>

                        <br/>
                        <div className="form-group">
                            <button className="btn btn-primary">
                                {articleUpdate && <span className="spinner-border spinner-border-sm mr-1"></span>}
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

function ManageArticles(){
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const [selectedArticle, setSelectedArticle] = useState(null);

    // Table
    const columns = [
        {
            dataField: 'id_article',
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
            dataField: 'id_course',
            text: 'Cours',
            sort: true
        }, {
            text: "Action",
            dataField: "",
            formatter: GetActionFormat,
        }
    ];
    const { SearchBar } = Search;

    useEffect(() => {
        dispatch(articleActions.getAll());
    }, []);

    function handleDeleteButton(e){
        setSelectedArticle(e)
    }

    function confirmDelete(){
        if(selectedArticle) {
            dispatch(articleActions.delete(selectedArticle)).then((data, err) => {
                dispatch(articleActions.getAll());
            });
        }
    }

    function GetActionFormat(cell, row) {
        return (
            <div>
                <Link to={{pathname: `/dashboard/article/edit/${row.id_article}`}} className="btn btn-outline-primary btn-sm ts-buttom" size="sm">
                    Modifier
                </Link>
                <button type="button" className="btn btn-outline-danger btn-sm ml-2 ts-buttom" size="sm" data-toggle="modal" data-target="#deleteArticleModal" onClick={handleDeleteButton(row.id_article)}>
                    Supprimer
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Articles</h1>
                </div>

                <div className="col-12">
                    {articles.loading && <em>Chargement...</em>}
                    {articles.error && <span className="text-danger">ERREUR : {articles.error}</span>}
                    {articles.items &&
                        <div className="list_articles">
                        <ToolkitProvider
                            keyField="id"
                            data={articles.items}
                            columns={columns}
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
                </div>
            </div>

            <DeleteModal idModal={"deleteArticleModal"} selectedArticle={selectedArticle} modalFunction={confirmDelete}/>
        </div>
    )
}

export {CreateArticle, EditArticle, ManageArticles};
