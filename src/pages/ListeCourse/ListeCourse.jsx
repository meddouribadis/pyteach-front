import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { courseActions } from '../../_actions';

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
        <div className="col-lg-8 offset-lg-2">
            <p>TO DO : Liste course to be displayed</p>
        </div>
    );
}

export { ListeCoursePage };