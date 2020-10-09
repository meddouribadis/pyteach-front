import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//Routes
import {CreateCourse} from "./CreateCourse";
import {DashboardHome} from "./DashboardHome";

function DashboardRouter() {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={DashboardHome} />
            <Route exact path={`${path}/create-course`} component={CreateCourse} />
        </Switch>
    );
}

export { DashboardRouter };