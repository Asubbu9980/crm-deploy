import { APIS } from '.';
import { get, post, update, remove } from './methods'

export const createUser = (body) => {
    let url = APIS.USER_REGISTER;
    return post(url, body).then(response => response)
        .catch(error => {
            console.error('There was an error!', error);
        });
}

export const login = (body) => {
    let url = APIS.USER_LOGIN;
    return post(url, body).then(response => response)
        .catch(error => {
            console.error('There was an error!', error);
        });
}

export const getUsers = () => {
    let url = APIS.GET_USER;
    return get(url).then(response => response).catch(error => {
        console.error('There was an error!', error);
    });
}