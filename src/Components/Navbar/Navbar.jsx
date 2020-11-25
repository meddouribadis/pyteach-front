import React, {Fragment} from "react";
import logo from '../../Assets/univ_evvry_logo.png';
import {useSelector} from "react-redux";

function Navbar() {

    const user = useSelector(state => state.authentication.user);

    function TeacherLinks(){
        return (
            <Fragment>
                <a className="py-2 d-none d-md-inline-block" href="/dashboard">Tableau de bord</a>
            </Fragment>
        );
    }

    function UserInfo(){
        if (user) {
            return (
                <div className="dropdown show">
                    <a className="py-2 d-none d-md-inline-block dropdown-toggle" href="#" role="button" id="dropdownMenuUser"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {user.firstName}
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuUser">
                        <a className="dropdown-item" href="/profile">Mon profil</a>
                        <a className="dropdown-item" href="#">Contact</a>
                        <a className="dropdown-item" href="/login">Se déconnecter</a>
                    </div>
                </div>
            );
        }
        return (
            <Fragment>
                <a className="py-2 d-none d-md-inline-block" href="/login">Connexion</a>
                <a className="py-2 d-none d-md-inline-block" href="/register">Inscription</a>
            </Fragment>
        );
    }

    return (
        <nav className="site-header sticky-top">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                <a className="navbar-brand" href="/">
                    Pyteach
                </a>

                <a className="top-link py-2 d-none d-md-inline-block" href="/">Accueil</a>
                <a className="top-link py-2 d-none d-md-inline-block" href="#">Information</a>
                {user && user.role === 'TEACHER' &&
                <TeacherLinks/>
                }
                <UserInfo/>
            </div>
        </nav>
    );
}

export { Navbar };
