import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { courseActions } from '../../_actions';
import {CourseInfobox} from "../../Components/CourseInfobox";

function StartCoursePage() {
    const user = useSelector(state => state.authentication.user);
    const courses = useSelector(state => state.courses);
    const dispatch = useDispatch();

    let { courseId } = useParams();

    useEffect(() => {
        dispatch(courseActions.getById(courseId));
    }, []);

    return (
        <div className="start-course">
            {courses.loading && <em>Chargement...</em>}
            {courses.error && <span className="text-danger">Erreur : {courses.error}</span>}
            {courses.currentCourse && displayCourseInfo(courses.currentCourse)}
        </div>
    );
}

function displayCourseInfo(course){
    return (
        <div className="course">
            <h1>{course.title}</h1>
            <p className="blockquote-footer">Catégorie : {course.category.title} - Auteur : {course.User.firstName} {course.User.lastName}</p>
            <p className="body">{course.description}</p>
            <h2>Le contenu de ce cours :</h2>

            <div className="list-group">
                {course.exercices.map((exercice, index) => {
                    return ([
                        <a href="#" className="list-group-item list-group-item-action">{exercice.title}</a>
                    ])
                })
                }
            </div>

        </div>
    );
}

export { StartCoursePage };