import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (!localStorage.getItem('user')) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

function SecuredRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            const user = JSON.parse(localStorage.getItem('user'));

            if (!localStorage.getItem('user')) {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            if(user.role == 'STUDENT') {
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }

            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute, SecuredRoute };
