import { error } from "src/hooks/Toasters";
import { baseUrl } from ".";
const excludeLocations = ['/login']

function getheaders() {
    // var options = { 'Content-Type': 'application/json' , 'Authorization': 'Bearer my-token', };
    var options = { 'Content-Type': 'application/json' };
    return options;
}

export function Get(url) {
    return fetch(baseUrl + url, getheaders()).then(response => response.json())
        .then(res => {
            if (res.status === 401 && !excludeLocations.includes(window.location.pathname)) {
                error('Session Expired! Please Login.');
                window.location.replace('/login')
            }
            return res;
        })
}

export function Post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: getheaders(),
        body: JSON.stringify(body)
    };
    return fetch(baseUrl + url, requestOptions).then(response => response.json())
        .then(res => {
            if (res.status === 401 && !excludeLocations.includes(window.location.pathname)) {
                error('Session Expired! Please Login.');
                window.location.replace('/login');
            }
            return res;
        })
}

export function Update(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: getheaders(),
        body: JSON.stringify(body)
    };
    return fetch(baseUrl + url, requestOptions).then(response => response.json())
        .then(res => {
            if (res.status === 401 && !excludeLocations.includes(window.location.pathname)) {
                error('Session Expired! Please Login.');
                window.location.replace('/login');
            }
            return res;
        })
}

export function Remove(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: getheaders()
    };
    return fetch(baseUrl + url, requestOptions).then(response => response.json())
        .then(res => {
            if (res.status === 401 && !excludeLocations.includes(window.location.pathname)) {
                error('Session Expired! Please Login.');
                window.location.replace('/login');
            }
            return res;
        })
}

export function uploadFile(url, body) {
    const requestOptions = {
        method: 'POST',
        body: body
    };
    return fetch(baseUrl + url, requestOptions).then(response => response.json())
        .then(res => {
            if (res.status === 401 && !excludeLocations.includes(window.location.pathname)) {
                error('Session Expired! Please Login.');
                window.location.replace('/login');
            }
            return res;
        })
}