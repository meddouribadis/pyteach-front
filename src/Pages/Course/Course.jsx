import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {StartCoursePage} from "./StartCourse";
import {ListeCoursePage} from "./ListeCourse";

function CourseRouter() {

    let { path, url } = useRouteMatch();

    return (
            <Switch>
                <Route exact path={path} component={ListeCoursePage} />
                <Route path={`${path}/:courseId`} component={StartCoursePage} />
            </Switch>
    );
}

export { CourseRouter };