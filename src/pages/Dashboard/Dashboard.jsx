import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';

//Routes
import {CreateCourse} from "./CreateCourse";

function DashboardRouter() {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={CreateCourse} />
            <Route exact path={`${path}/create-course`} component={CreateCourse} />
        </Switch>
    );
}

export { DashboardRouter };