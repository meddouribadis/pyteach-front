import React, {useEffect, useState} from "react";
import {categoryActions, userActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function CreateCategoryPage() {

    const user = useSelector(state => state.authentication.user);
    const categoryCreation = useSelector(state => state.categories.categoryCreation);
    const dispatch = useDispatch();

    const [category, setCategory] = useState({
        title: '',
        description: ''
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if(user.role !== 'ENSEIGNANT'){
            console.log("TODO : Redirect beacause user is " + user.role);
        }
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setCategory(category => ({ ...category, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (category.title && category.description) {
            dispatch(categoryActions.postCategory(category));
        }
    }

    return (
        <div className="row">
            <div className="col">
                <form name="form" onSubmit={handleSubmit}>
                    <h1>Créer une catégorie</h1>
                    <hr/>

                    <div className="form-group">
                        <label>Titre de la catégorie :</label>
                        <input type="text" name="title" value={category.title} onChange={handleChange} className={'form-control' + (submitted && !category.title ? ' is-invalid' : '')} placeholder="Titre de la catégorie" />
                        {submitted && !category.title &&
                        <div className="invalid-feedback">Le titre de catégorie est requis</div>
                        }
                    </div>

                    <div className="form-group">
                        <label>Description de la catégorie :</label>
                        <input type="text" name="description" value={category.description} onChange={handleChange} className={'form-control' + (submitted && !category.description ? ' is-invalid' : '')} placeholder="Description de la catégorie" />
                        {submitted && !category.description &&
                        <div className="invalid-feedback">La description de la catégorie est requise</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">
                            {categoryCreation && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Valider
                        </button>
                        <Link to="/dashboard" className="btn btn-link">Annuler</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

function ManageCategoriesPage() {

    const user = useSelector(state => state.authentication.user);
    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(categoryActions.getAll());
    }, []);

    return (
        <div className="row">
            <div className="col">
                <h1>Vos catégories</h1>
                <hr/>
                {categories.loading && <em>Loading catégories...</em>}
                {categories.error && <span className="text-danger">ERROR: {categories.error}</span>}
                {categories.items &&
                <table className="table">
                    <thead className={"thead-dark"}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {categories.items.map((category, index) =>
                        <tr>
                            <th scope="row">{category.id_cat}</th>
                            <td>{category.title}</td>
                            <td>{category.description}</td>
                            <td><Link to={{pathname: "/dashboard/manage-categories"}} className="btn btn-primary">Modifier</Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
                }
            </div>
        </div>
    );
}

export {CreateCategoryPage,ManageCategoriesPage};