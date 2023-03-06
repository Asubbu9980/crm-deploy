export const baseUrl = '/api/v1/';

export const APIS = {

    //user
    USER_REGISTER: 'user-register',
    USER_LOGIN: 'user-login',
    GET_USER: 'get-user',


    //clients
    CREATE_CLIENTS: 'clients/create',
    GET_CLIENTS: (limit = 500, skip = 0, search = '', status) => {
        let url = `clients/getAll?limit=${limit}&skip=${skip}`;
        if (search) url = `${url}&search=${search}`
        if (status) url = `${url}&status=${status}`
        return url;
    },
    GET_ALL_CLIENTS: 'clients/getAll',
    UPDATE_CLIENT: (clientId = null) => `clients/update/${clientId}`,
    UPDATE_CLIENT_FROM_BDM: (clientId = null) => `clients/updateClientFromBDM/${clientId}`,
    DELETE_CLIENT: (clientId = null) => `clients/delete/${clientId}`,
    UPLOAD_CLIENTS: `file/clients/upload`,
    CLIENTS_ASSIGN_TO_BDM: 'clients/assignToBDM',
    GET_ALL_BDM_CLIENTS: (limit = 500, skip = 0, search = '', status) => {
        let url = `clients/getBDMClients?limit=${limit}&skip=${skip}`;
        if (search) url = `${url}&search=${search}`
        if (status) url = `${url}&status=${status}`
        return url;
    },

    //employee
    GET_ALL_BDM_EMPLOYEES:'employees/getAllBDMEmployees',
    GET_ALL_EMPLOYEES:'employees/getAll',
    EMPLOYEE_AUTH: 'employees/auth',
    EMPLOYEE_LOGIN: 'employees/login',
    GET_LOGIN_DATA: 'employees/getLoginData',
    UPDATE_EMPLOYEE: (employeeSNO = null) => `employees/updateEmployee/${employeeSNO}`,
    EMPLOYEE_CREATE: 'employees/createEmployee',
    DELETE_EMPLOYEE:(employeeSNO=null)=>`employees/delete/${employeeSNO}`,
    EMPLOYEE_LOGOUT: 'employees/logout',


    // Utilities
    GET_STATICS: 'statics/get',



}
