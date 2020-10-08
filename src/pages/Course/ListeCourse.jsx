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
        <div key={"list"}>
            <h1>Bienvenue {user.firstName}!</h1>
            <p>Python est un langage de programmation populaire. Des milliers d’entreprises ont construit leurs sites Web avec Python, notamment Google, Facebook, Dropbox, Instagram et Reddit.</p>
            <p>
Python est utilisé pour toutes sortes de tâches, telles que la création de sites Web, le jeu vidéo, l’aspiration de sites, l’analyse de données, l’apprentissage automatique et le traitement du langage naturel ou encore de simples applications.

Le langage Python est conçu pour être facile à lire sans pour autant sacrifier sa puissance, ce qui en fait un excellent langage pour les débutants.</p>
            <p>Pourquoi devriez-vous apprendre le Python ?</p>
            <p>
                <ul>
                    <li>Python est facile à apprendre</li>
                    <li>C'est un langage de choix, c'est-à-dire à usage général (application, jeux, site web, etc..),</li>
                    <li>C'est un langage polyvalent et multiplate-forme,</li>
                    <li>Il dispose de l'un des gestionnaires de paquets les plus matures,</li>
                    <li>c'est un langage couramment utilisé dans la science des données,</li>
                    <li>il est multiplate-forme et open source</li>
                    <li>Et la raison la plus importante : Si vous souhaitez ajouter un langage à votre bibliothèque existante, la demande de programmeurs en Python est énorme.</li>
                </ul>
            </p>
            <p>Pour suivre ce cours en ligne, vous n'avez besoin d'aucun pré-requis, d'aucune compétence en développement !
Il est aussi adapté aux développeurs désirant apprendre le Python.</p>

<p>Nous sommes disponible dans le salon d'entraide pour répondre à vos questions.
Les fichiers de travail sont fournis avec le cours.

Bonne formation ! </p>

            <h1>Liste des cours sur la formation python</h1>
            <a>Installation</a>
            <a>Premier pas</a>
            <a>Les fonctions en python</a>


            <hr />
            {courses.loading && <em>Chargement des cours...</em>}
            {courses.error && <span className="text-danger">Erreur : {courses.error}</span>}
            {courses.items && courses.items.map((course, index) => {
                return ([
                        <CourseInfobox course={course} />,
                        <br />
                    ])
                })
            }
        </div>
    );
}

export { ListeCoursePage };