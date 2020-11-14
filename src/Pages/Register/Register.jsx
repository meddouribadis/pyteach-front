import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="row">
            <div className="container">
                <div className="col-lg-8 offset-lg-2">
                    <h2>S'enregistrer</h2>
                    <form name="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Votre prénom</label>
                            <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} placeholder="Votre prénom" />
                            {submitted && !user.firstName &&
                            <div className="invalid-feedback">First Name is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Votre nom de famille</label>
                            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} placeholder="Votre nom" />
                            {submitted && !user.lastName &&
                            <div className="invalid-feedback">Last Name is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Nom d'utilisateur</label>
                            <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} placeholder="Nom d'utilisateur" />
                            {submitted && !user.username &&
                            <div className="invalid-feedback">Username is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>eMail</label>
                            <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} aria-describedby="emailHelp" placeholder="Votre email" />
                            <small id="emailHelp" className="form-text text-muted">Nous ne partagerons jamais votre mail avec des tiers.</small>
                            {submitted && !user.email &&
                            <div className="invalid-feedback">Email is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} placeholder="Mot de passe"/>
                            {submitted && !user.password &&
                            <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">
                                {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Valider
                            </button>
                            <Link to="/login" className="btn btn-link">Annuler</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export { RegisterPage };