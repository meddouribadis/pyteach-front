import React, {useEffect, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {categoryActions, courseActions, articleActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

function CreateArticle() {

    const user = useSelector(state => state.authentication.user);
    const articleCreation = useSelector(state => state.articles.articleCreation);
    const dispatch = useDispatch();

    const [article, setArticle] = useState({
        title: '',
        description: '',
        id_course: '',
        body: '',
        position: '',
        isPublished: true,
        isExercice: false
    });

    const [quillDescription, setArticleBody] = useState('');

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
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
        console.log(article)
        setSubmitted(true);
        if (article.title && article.description && article.id_course && article.position && article.position && article.body) {
            console.log("Enteringf data");
            dispatch(articleActions.postArticle(article));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form name="form" onSubmit={handleSubmit}>
                        <h1>Créer un article</h1>
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
                            <input type="text" name="id_course" value={article.id_course} onChange={handleChange} className={'form-control' + (submitted && !article.id_course ? ' is-invalid' : '')} placeholder="ID_Cours" />
                            {submitted && !article.id_course &&
                            <div className="invalid-feedback">La id_course de l'article est requise</div>
                            }
                        </div>

                        <label>Corps de l'article :</label>
                        <ReactQuill theme="snow" value={quillDescription} onChange={setArticleBody}/>
                        <br/>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" data-toggle="switch" name="published" checked={article.published} onChange={handleChange} id="publishedCheck" />
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
                            <Link to="/dashboard" className="btn btn-link">Annuler</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export {CreateArticle};
