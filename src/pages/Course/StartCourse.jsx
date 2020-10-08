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
            <p className="body">{course.description}</p>
            <h2>Le contenu de ce cours :</h2>

            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
                <li>F</li>
                <li>G</li>

            </ul>

        </div>
    );
}

export { StartCoursePage };