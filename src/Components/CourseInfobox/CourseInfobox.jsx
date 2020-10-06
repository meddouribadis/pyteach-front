import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function CourseInfobox(props) {

    return (
        <div className="card">
            <h5 className="card-header">{props.course.title}</h5>
            <div className="card-body">
                <h5 className="card-title">{props.course.description}</h5>
                <p className="card-text">{props.course.tags}</p>
                <Link to="/{props.course.title}"><a className="btn btn-primary">Acceder au cours</a></Link>
            </div>
        </div>
    );
}

export { CourseInfobox };