import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { courseActions } from '../../_actions';

function StartCoursePage() {
    const user = useSelector(state => state.authentication.user);
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(courseActions.getAll());
    }, []);

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <p>Python est un langage de programmation populaire. Des milliers d’entreprises ont construit leurs sites Web avec Python, notamment Google, Facebook, Dropbox, Instagram et Reddit.</p>
            <p>
                Python est utilisé pour toutes sortes de tâches, telles que la création de sites Web, le jeu vidéo, l’aspiration de sites, l’analyse de données, l’apprentissage automatique et le traitement du langage naturel ou encore de simples applications.

                Le langage Python est conçu pour être facile à lire sans pour autant sacrifier sa puissance, ce qui en fait un excellent langage pour les débutants.</p>
            <p>Pourquoi devriez-vous apprendre le Python ?</p>
            <p>
                <ul>
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                    <li>D</li>
                    <li>E</li>
                    <li>F</li>
                    <li>G</li>

                </ul>
            </p>
        </div>
    );
}

export { StartCoursePage };