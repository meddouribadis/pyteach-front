import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';

//Routes
import {CreateCourse, EditCourse, ManageCourses} from "./CourseDashboard";
import {CreateCategoryPage, ManageCategoriesPage} from "./CategoryDashboard";
import {CreateArticle, EditArticle} from "./ArticleDashboard";

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
            <Route exact path={`${path}/category/manage`} component={ManageCategoriesPage} />

            <Route exact path={`${path}/article/create`} component={CreateArticle} />
            <Route exact path={`${path}/article/create/:courseId`} component={CreateArticle} />
            <Route exact path={`${path}/article/edit/:articleId`} component={EditArticle} />
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
                    <Link to={{pathname: "/dashboard/course/create"}} className="btn btn-link">Créer un cours</Link>
                    <Link to={{pathname: "/dashboard/course/manage"}} className="btn btn-link">Gérer les cours</Link>
                    <Link to={{pathname: "/dashboard/category/create"}} className="btn btn-link">Créer une catégorie</Link>
                    <Link to={{pathname: "/dashboard/category/manage"}} className="btn btn-link">Gérer les catégories</Link>
                </div>
            </div>
        </div>

    );
}

export { DashboardRouter, DashboardHome};