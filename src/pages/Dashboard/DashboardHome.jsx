import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function DashboardHome() {

    return (
        <div className="body">
            <h1>Tableau de bord !</h1>
            <hr/>
            <p>Vous pouvez réalisez les actions suivantes :</p>
            <Link to={{pathname: "/dashboard/create-course"}} className="btn btn-link">Créer un cours</Link>
        </div>
    );
}

export { DashboardHome };