import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch, Redirect} from 'react-router-dom';
import './Dashboard.css';

//Routes
import {CreateCourse, EditCourse, ManageCourses} from "./CourseDashboard";
import {CreateCategoryPage, EditCategory, ManageCategoriesPage} from "./CategoryDashboard";
import {CreateArticle, EditArticle, ManageArticles} from "./ArticleDashboard";

// Routeur Dashboard
function DashboardRouter() {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={DashboardHome} />
            <Route exact path={`${path}/course/create`} component={CreateCourse} />
            <Route exact path={`${path}/course/manage`} component={ManageCourses} />
            <Route path={`${path}/course/edit/:courseId`} component={EditCourse} />

            <Route exact path={`${path}/category/create`} component={CreateCategoryPage} />
            <Route exact path={`${path}/category/edit/:categoryId`} component={EditCategory} />
            <Route exact path={`${path}/category/manage`} component={ManageCategoriesPage} />

            <Route exact path={`${path}/article/create/:courseId`} component={CreateArticle} />
            <Route exact path={`${path}/article/edit/:articleId`} component={EditArticle} />
            <Route exact path={`${path}/article/manage`} component={ManageArticles} />

            <Redirect from="*" to={`${path}`} />
        </Switch>
    );
}

// Page Accueil Dashboard
function DashboardHome() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Tableau de bord !</h1>
                    <hr/>
                    <p>Vous pouvez réalisez les actions suivantes :</p>
                </div>
            </div>
            <div className="row">

                <div className="col-sm-6 col-md-6 col-lg-3">
                    <div className="card-stats card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="title text-center">
                                        <h4 className="card-category">Cours</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><Link to={{pathname: "/dashboard/course/create"}} className="btn btn-link">Créer un cours</Link></li>
                            <li className="list-group-item"><Link to={{pathname: "/dashboard/course/manage"}} className="btn btn-link">Gérer les cours</Link></li>
                        </ul>
                        <div className="card-footer">
                            <p></p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-md-6 col-lg-3">
                    <div className="card-stats card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="title text-center">
                                        <h4 className="card-category">Catégories</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><Link to={{pathname: "/dashboard/category/create"}} className="btn btn-link">Créer une catégorie</Link></li>
                            <li className="list-group-item"><Link to={{pathname: "/dashboard/category/manage"}} className="btn btn-link">Gérer les catégories</Link></li>
                        </ul>
                        <div className="card-footer">
                            <p></p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-md-6 col-lg-3">
                    <div className="card-stats card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="title text-center">
                                        <h4 className="card-category">Articles</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><Link to={{pathname: "/dashboard/article/create"}} className="btn btn-link">Créer un article</Link></li>
                            <li className="list-group-item"><Link to={{pathname: "/dashboard/article/manage"}} className="btn btn-link">Gérer les articles</Link></li>
                        </ul>
                        <div className="card-footer">
                            <p></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export { DashboardRouter, DashboardHome};
