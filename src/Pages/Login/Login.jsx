import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions';

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(username, password, from));
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <h1>Connexion</h1>
                    <hr/>
                    <form name="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nom d'utilisateur</label>
                            <input type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                            {submitted && !username &&
                            <div className="invalid-feedback">Le nom d'utilisateur est requis</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                            {submitted && !password &&
                            <div className="invalid-feedback">Le mot de passe est requis</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">
                                {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Se connecter
                            </button>
                            <Link to="/register" className="btn btn-link">S'inscrire</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export { LoginPage };