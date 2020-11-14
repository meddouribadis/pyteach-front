import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';

//Routes
import {CreateCourse, EditCourse, ManageCourses} from "./CourseDashboard";
import {CreateCategoryPage, ManageCategoriesPage} from "./CategoryDashboard";

// Routeur Dashboard
function DashboardRouter() {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={DashboardHome} />
            <Route exact path={`${path}/course/create`} component={CreateCourse} />
            <Route exact path={`${path}/course/manage`} component={ManageCourses} />
            <Route path={`${path}/course/edit/:courseId`} component={EditCourse} />
            <Route exact path={`${path}/create-category`} component={CreateCategoryPage} />
            <Route exact path={`${path}/manage-categories`} component={ManageCategoriesPage} />
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
                    <Link to={{pathname: "/dashboard/create-category"}} className="btn btn-link">Créer une catégorie</Link>
                    <Link to={{pathname: "/dashboard/manage-categories"}} className="btn btn-link">Gérer les catégories</Link>
                </div>
            </div>
        </div>

    );
}

export { DashboardRouter, DashboardHome};
