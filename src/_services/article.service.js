import config from 'config';
import { authHeader } from '../_helpers';

export const articleService = {
    getAll,
    getById,
    postArticle,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/articles`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/articles/${id}`, requestOptions).then(handleResponse);
}

function postArticle(article) {

    const headersVar = Object.assign({ 'Content-Type': 'application/json' }, authHeader());

    const requestOptions = {
        method: 'POST',
        headers: headersVar,
        body: JSON.stringify(article)
    };

    return fetch(`${config.apiUrl}/articles`, requestOptions).then(handleResponse);
}

function update(article) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
    };

    return fetch(`${config.apiUrl}/articles/${user.id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/articles/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                console.log("Not authorized");
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
