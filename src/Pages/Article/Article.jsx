import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {articleActions, courseActions} from "../../_actions";

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

    return (
        <div className="container">
            <div className="row">
                <div className="col read-article">
                    {articles.loading && <em>Chargement...</em>}
                    {articles.error && <span className="text-danger">Erreur : {articles.error}</span>}
                    {articles.currentArticle &&
                        <div>
                            <h1>{articles.currentArticle.title}</h1>
                            <p className="blockquote-footer">{articles.currentArticle.description}</p>
                            <p className="body" dangerouslySetInnerHTML={{__html: articles.currentArticle.body}}/>
                        </div>
                    }
                </div>
            </div>
        </div>

    );
}

export { ArticleRouter };
