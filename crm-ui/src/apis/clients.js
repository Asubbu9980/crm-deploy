import { APIS } from './index';
import { Post, Get, Remove, uploadFile } from './methods';


export const createClients = (body) => {
    let url = APIS.CREATE_CLIENTS;
    return Post(url, body).then(response => response)
        .catch(error => {
            console.error('There was an error!', error);
        })
}

export const getClients = (limit, skip, search, status) => {
    let url = APIS.GET_CLIENTS(limit, skip, search, status);
    return Get(url).then(response => response)
        .catch(error => {
            console.error('There was an error!', error)
        })
}
export const getBDMClients = (limit, skip, search, status) => {
    let url = APIS.GET_ALL_BDM_CLIENTS(limit, skip, search, status);
    return Get(url).then(response => response)
        .catch(error => {
            console.error('There was an error!', error)
        })
}

export const updateClient = (clientId, body) => {
    let url = APIS.UPDATE_CLIENT(clientId);
    return Post(url, body).then(response => response)
        .catch(error => {
            console.error('There was an error!', error);
        })
}

export const updateClientFromBDM = (clientId, body) => {
    let url = APIS.UPDATE_CLIENT_FROM_BDM(clientId);
    return Post(url, body).then(response => response)
        .catch(error => {
            console.error('There was an error!', error);
        })
}

export const deleteClient = (clientId) => {
    let url = APIS.DELETE_CLIENT(clientId);
    return Remove(url).then(response => response)
        .catch(error => {
            console.error('There was an error!', error);
        })
}

export const uploadClients = (body) => {
    let url = APIS.UPLOAD_CLIENTS;
    return uploadFile(url, body).then(response => response)
        .catch(error => {
            console.error('There was an error!', error);
        })
}

export const assignToBDM = (body) => {
    let url = APIS.CLIENTS_ASSIGN_TO_BDM;
    return Post(url, body).then(response => response)
        .catch(error => {
            console.error('There was an error!', error);
        })
}
