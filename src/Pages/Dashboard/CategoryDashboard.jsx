import React, {useEffect, useState} from "react";
import {categoryActions, userActions} from "../../_actions";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {history} from "../../_helpers";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

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
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Créer une catégorie</h1>
                    <hr/>
                </div>

                <div className="col-12">
                    <form name="form" onSubmit={handleSubmit}>

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
                            <button type={"button"} className="btn btn-link" onClick={history.goBack}>Annuler</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

function ManageCategoriesPage() {

    const user = useSelector(state => state.authentication.user);
    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();

    // Table
    const columns = [
        {
            dataField: 'id_cat',
            text: '#',
            sort: true
        }, {
            dataField: 'title',
            text: 'Titre',
            sort: true
        }, {
            dataField: 'description',
            text: 'Description',
            sort: false
        }, {
            text: "Action",
            dataField: "",
            formatter: GetActionFormat,
        }
    ];
    const { SearchBar } = Search;

    useEffect(() => {
        dispatch(categoryActions.getAll());
    }, []);

    function GetActionFormat(cell, row) {
        return (
            <div>
                <Link to={{pathname: `/dashboard/category/edit/${row.id_cat}`}} className="btn btn-outline-primary btn-sm ts-buttom" size="sm">
                    Modifier
                </Link>
                <Link to={{pathname: `/dashboard/category/edit/${row.id}`}} className="btn btn-outline-danger btn-sm ml-2 ts-buttom" size="sm">
                    Supprimer
                </Link>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Vos catégories</h1>
                    <hr/>
                    {categories.loading && <em>Loading catégories...</em>}
                    {categories.error && <span className="text-danger">ERROR: {categories.error}</span>}
                    {categories.items &&
                        <div className="list_categories">
                        <ToolkitProvider
                            keyField="id"
                            data={ categories.items }
                            columns={ columns }
                            search
                        >
                            {
                                props => (
                                    <div>
                                        <SearchBar { ...props.searchProps } />
                                        <BootstrapTable
                                            { ...props.baseProps }
                                            pagination={ paginationFactory() }
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                    </div>
                    }
                    <Link to={{pathname: "/dashboard/category/create"}} className="btn btn-primary">Ajouter</Link>
                    <button className="btn btn-link" onClick={history.goBack}>Annuler</button>
                </div>
            </div>
        </div>
    );
}

export {CreateCategoryPage,ManageCategoriesPage};
