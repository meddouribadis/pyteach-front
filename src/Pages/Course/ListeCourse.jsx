import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { courseActions } from '../../_actions';
import {CourseInfobox} from "../../Components/CourseInfobox";

function ListeCoursePage() {
    const user = useSelector(state => state.authentication.user);
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(courseActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(courseActions.delete(id));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Bienvenue {user.firstName}!</h1>
                    <hr/>
                </div>
                <div className="col-12">
                    <h5>Si tu es là c'est que langage de programmation python t'interesse! Alors qu'est ce que
                        python?
                    </h5>
                    <p><b>Python est un langage de programmation populaire.</b> Des milliers d’entreprises ont construit
                        leurs sites Web avec Python, notamment <a href="www.google.fr" className="auto-link"
                                                                  title="Tuto Google">Google</a>, <a href="/facebook/"
                                                                                                     className="auto-link"
                                                                                                     title="Tuto Facebook">Facebook</a>,
                        Dropbox, Instagram et Reddit.</p>
                    <p>
                        <b>Python est utilisé pour toutes sortes de tâches</b>, telles que la création de sites Web, le
                        jeu vidéo, l’aspiration de sites, l’analyse de données, l’apprentissage automatique et le
                        traitement du langage naturel ou encore de simples applications.

                        <b>Le langage Python est conçu pour être facile à lire sans pour autant sacrifier sa
                            puissance</b>, ce qui en fait un excellent langage pour les débutants.</p>
                    <p>Pourquoi devriez-vous <b>apprendre le Python ?</b></p>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <b>Python est facile à apprendre</b>
                            <span className="badge badge-primary badge-pill">1</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            C'est un langage de choix, c'est-à-dire à usage général (application, jeux, site web,
                            etc..),
                            <span className="badge badge-primary badge-pill">2</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            C'est un langage polyvalent et multiplate-forme,
                            <span className="badge badge-primary badge-pill">3</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Il dispose de l'un des gestionnaires de paquets les plus matures,
                            <span className="badge badge-primary badge-pill">4</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            c'est un langage couramment utilisé dans la science des données,
                            <span className="badge badge-primary badge-pill">5</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Et la raison la plus importante :<b>Si vous souhaitez ajouter un langage à votre
                            bibliothèque existante, la demande de programmeurs en Python est énorme.</b>
                            <span className="badge badge-primary badge-pill">6</span>
                        </li>

                    </ul>
                    <br/>
                    <p>Pour suivre ce cours en ligne, vous n'avez besoin d'aucun pré-requis, d'aucune compétence en
                        développement ! Il est aussi adapté aux développeurs désirant apprendre le Python.</p>

                    <p>Nous sommes disponible dans le salon d'entraide pour répondre à vos questions.
                        Les fichiers de travail sont fournis avec le cours.

                        Bonne formation ! </p>
                </div>

                <SeeCourses/>
            </div>
        </div>
    );
}

function SeeCourses(){
    const user = useSelector(state => state.authentication.user);
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(courseActions.getAll());
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Liste des cours</h1>
                    <hr/>
                    {courses.loading && <em>Loading cours...</em>}
                    {courses.error && <span className="text-danger">ERROR: {courses.error}</span>}
                    {courses.items &&
                    <table className="table">
                        <thead className={"thead-dark"}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Description</th>
                            <th scope="col">Auteur</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {courses.items.map((course, index) =>
                            <tr>
                                <th scope="row">{course.id_course}</th>
                                <td>{course.title}</td>
                                <td>{course.description}</td>
                                <td>{course.author_id}</td>
                                <td><Link to={{pathname: `/cours/${course.id_course}`}} className="btn btn-primary">Afficher</Link></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </div>
    );
}

export { ListeCoursePage };
