import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../../_helpers';
import { alertActions } from '../../_actions';
import { PrivateRoute, SecuredRoute } from '../../_components';

// Pages
import { HomePage } from '../../Pages/Home';
import { LoginPage } from '../../Pages/Login';
import { RegisterPage } from '../../Pages/Register';
import { CourseRouter } from "../../Pages/Course/Course";
import { Exercice } from '../../Pages/Exercice';
import { DashboardRouter } from '../../Pages/Dashboard';
import {CourseSuiviRouter, ListeCoursePage} from "../../Pages/Course/CourseSuivi";

// Components
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

import './App.css';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className={'main'}>
            <Navbar />
                {alert.message &&
                    <div className="container">
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    </div>
                }
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/cours" component={CourseRouter}/>
                        <Route path="/exercice" component={Exercice} />
                        <Route path="/CourseSuivi" component={CourseSuiviRouter} />
                        
                        <SecuredRoute path="/dashboard" component={DashboardRouter} />
                    </Switch>
                </Router>
            <Footer />
        </div>
    );
}

export { App };
