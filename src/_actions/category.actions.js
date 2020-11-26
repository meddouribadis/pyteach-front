import {categoryConstants} from '../_constants';
import {categoryService} from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const categoryActions = {
    getAll,
    getById,
    postCategory,
    putCategory,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        categoryService.getAll()
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: categoryConstants.GETALL_REQUEST } }
    function success(categories) { return { type: categoryConstants.GETALL_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            categoryService.getById(id)
                .then(
                    category => resolve(dispatch(success(category))),
                    error => reject(dispatch(failure(error.toString())))
                );
        });
    };

    function request() { return { type: categoryConstants.GETBYID_REQUEST } }
    function success(category) { return { type: categoryConstants.GETBYID_SUCCESS, category } }
    function failure(error) { return { type: categoryConstants.GETBYID_FAILURE, error } }
}

function postCategory(category) {
    return dispatch => {
        dispatch(request(category));

        categoryService.postCategory(category)
            .then(
                category => {
                    dispatch(success(category));
                    dispatch(alertActions.success('Catégorie crée avec succès'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(category) { return { type: categoryConstants.POST_CATEGORY_REQUEST, category } }
    function success(category) { return { type: categoryConstants.POST_CATEGORY_SUCCESS, category } }
    function failure(error) { return { type: categoryConstants.POST_CATEGORY_FAILURE, error } }
}

function putCategory(category) {
    return dispatch => {
        dispatch(request(category));

        categoryService.update(category)
            .then(
                category => {
                    dispatch(success(category));
                    dispatch(alertActions.success('Catégorie mise à jour'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(category) { return { type: categoryConstants.PUT_CATEGORY_REQUEST, category } }
    function success(category) { return { type: categoryConstants.PUT_CATEGORY_SUCCESS, category } }
    function failure(error) { return { type: categoryConstants.PUT_CATEGORY_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        categoryService.delete(id)
            .then(
                id => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: categoryConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: categoryConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: categoryConstants.DELETE_FAILURE, id, error } }
}
