import { courseConstants } from '../_constants';
import { courseService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const courseActions = {
    getAll,
    getById,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        courseService.getAll()
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: courseConstants.GETALL_REQUEST } }
    function success(courses) { return { type: courseConstants.GETALL_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GETALL_FAILURE, error } }
}


function getById(id) {
    return dispatch => {
        dispatch(request());

        courseService.getById(id)
            .then(
                course => dispatch(success(course)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: courseConstants.GETBYID_REQUEST } }
    function success(course) { return { type: courseConstants.GETBYID_SUCCESS, course } }
    function failure(error) { return { type: courseConstants.GETBYID_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                course => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: courseConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: courseConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: courseConstants.DELETE_FAILURE, id, error } }
}