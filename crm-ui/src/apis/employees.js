import { APIS } from "./index";
import { Get, Post,Remove } from "./methods";


export const employeeAuth = (body) => {
    let url = APIS.EMPLOYEE_AUTH;
    return Get(url).then(response => response)
        .catch(error => {
            console.error('There was an error!', error)
        })
}

export const employeeLogin = (body) => {
    let url = APIS.EMPLOYEE_LOGIN;
    return Post(url, body).then(response => response)
        .catch(error => {
            console.error('There was an error!', error)
        })
}

export const getLoginData = () => {
    let url = APIS.GET_LOGIN_DATA;
    return Get(url).then(response => response)
        .catch(error => {
            console.error('There was an error!', error)
        })
}

export const updateEmployee = (employeeSNO, body) => {
    let url = APIS.UPDATE_EMPLOYEE(employeeSNO);
    return Post(url, body).then(response => response)
        .catch(error => {
            console.error('There was an error!', error)
        })
}

export const logoutEmployee = () => {
    let url = APIS.EMPLOYEE_LOGOUT;
    return Get(url).then(response => response)
        .catch(error => {
            console.error('There was an error!', error)
        })
}


export const getStaticData = () => {
    let url = APIS.GET_STATICS;
    return Get(url).then(response => response)
        .catch(error => {
            console.error('There was an error!', error)
        })
}

export const createEmployee = (empData) => {
    let url = APIS.EMPLOYEE_CREATE;
    return Post(url, empData).then(response => response)
        .catch(error => {
            console.error('There was an error!', error)
        })
}

export const getAllEmployees =()=>{
    let url = APIS.GET_ALL_EMPLOYEES;
    return Get(url).then(response => response)
        .catch(error => {
            console.error('There was an error!', error)
        })
}
export const deleteEmployee = (employeeSNO) => {
    let url = APIS.DELETE_EMPLOYEE(employeeSNO);
    return Remove(url).then(response => response)
        .catch(error => {
            console.error('There was an error!', error);
        })
}

export const getAllBDMEmployees =()=>{
    let url = APIS.GET_ALL_BDM_EMPLOYEES;
    return Get(url).then(response => response)
        .catch(error => {
            console.error('There was an error!', error)
        })
}