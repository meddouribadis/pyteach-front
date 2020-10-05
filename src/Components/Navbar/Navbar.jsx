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
            className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">PyTeach</h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href={"/courses"}>Cours</a>
                <a className="p-2 text-dark" href="/">Présentation</a>
                <a className="p-2 text-dark" href="#">Support</a>
                <a className="p-2 text-dark" href="#">Pricing</a>
                <UserInfo />
            </nav>

        </div>
    );
}

export { Navbar };