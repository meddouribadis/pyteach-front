import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {articleActions} from "../../_actions";
import {Skulpt} from "../../Components/Skulpt";

function ArticleRouter() {
    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/:articleId`} component={ReadArticle} />
        </Switch>
    );
}

function ReadArticle() {
    const user = useSelector(state => state.authentication.user);
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();

    let { articleId } = useParams();

    useEffect(() => {
        dispatch(articleActions.getById(articleId));
    }, []);

    function handleCompleteArticle(e) {
        e.preventDefault();
        dispatch(articleActions.completeArticle(articles.currentArticle.id_article, user.id))
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 read-article">
                    {articles.loading && <em>Chargement...</em>}
                    {articles.error && <span className="text-danger">Erreur : {articles.error}</span>}
                    {articles.currentArticle &&
                        <div>
                            <h1>{articles.currentArticle.title}</h1>
                            <p className="blockquote-footer">{articles.currentArticle.description}</p>
                            {!articles.currentArticle.isExercice &&
                                <p className="body" dangerouslySetInnerHTML={{__html: articles.currentArticle.body}}/>
                            }
                            {articles.currentArticle.isExercice &&
                                <div>
                                    <Skulpt pythonCode={articles.currentArticle.body} />
                                    <br />
                                    <hr/>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>

            {articles.currentArticle &&
                <div className="row">
                    {articles.currentArticle.previousArticle &&
                    <div className="col read-article text-center">
                        <a href={`/article/${articles.currentArticle.previousArticle}`} className="btn btn-outline-success btn ts-buttom">Chapitre précedent</a>
                    </div>
                    }
                    <div className="col read-article text-center">
                        <button className="btn btn-primary btn-lg" onClick={handleCompleteArticle}>J'ai terminé ce chapitre</button>
                    </div>
                    {articles.currentArticle.nextArticle &&
                        <div className="col read-article text-center">
                            <a href={`/article/${articles.currentArticle.nextArticle}`} className="btn btn-outline-success btn ts-buttom">Chapitre suivant</a>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export { ArticleRouter };
