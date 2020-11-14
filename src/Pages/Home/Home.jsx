import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions';
import {ListeCoursePage} from "../Course/CourseSuivi";

//CSS
import "./Home.css";


function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Cours suivis</h1>
                    <hr/>
                </div>

            </div>
        </div>
    );
}

export { HomePage };