import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            <h1>Liste des cours</h1>
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