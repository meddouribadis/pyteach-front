import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions';

function Navbar() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    console.log(user);
    useEffect(() => {
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    function UserInfo(){
        if (user) {
            return <a className="btn btn-outline-primary" href="/login">{user.username}</a>;
        }
        return <a className="btn btn-outline-primary" href="/login">S'inscrire</a>;
    }

    return (
        <div
        class="navbar navbar-expand-lg navbar-dark bg-dark">
            <h5 className="my-0 mr-md-auto font-weight-normal"><h5 class="table-dark" href="#">PyTeach</h5></h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <a class="table-dark" href={"/courses"}>Cours</a>&nbsp;&nbsp;
                <a class="table-dark" href="/">Présentation</a>&nbsp;&nbsp;
                <a class="table-dark" href="#">Support</a>&nbsp;&nbsp;
                <a class="table-dark" href="#">Pricing</a>&nbsp;&nbsp;
                <UserInfo />
            </nav>

        </div>
    );
}

export { Navbar };