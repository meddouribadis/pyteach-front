import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions';

//CSS
import "./Home.css";


function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="col-lg-12">
            <div className="col-lg-8">
            <h5>Salut {user.firstName} alors te revoilà!!!</h5>
        </div>
<div className="my-0 mr-md-auto font-weight-normal">
<ul class="nav nav-pills flex-column">
  <li class="nav-item">
    <a class="nav-link active" href="#">Mes cours</a>
    <ul class="nav nav-pills flex-column">
       <li class="nav-item">
          <a class="nav-link" href="#">Mes cours suivis</a>
       </li>
       <li class="nav-item dropdown">
         <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Exercices</a>
         <div class="dropdown-menu" >
            <a class="dropdown-item" href="#">Mes exercices rendus</a>
            <a class="dropdown-item" href="#">Correction du prof</a>
         </div>
      </li>
   </ul>
  </li>
  
  <li class="nav-item">
    <a class="nav-link" href="#">Modifier mon profil</a>
  </li>
</ul>
</div>

            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };