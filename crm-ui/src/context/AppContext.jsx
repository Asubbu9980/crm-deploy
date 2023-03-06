import React, { createContext, useContext, useState } from "react";
import { InitialAppState } from "../statics/appState";
import { logoutEmployee } from "src/apis/employees";
import { error } from "src/hooks/Toasters";
// import { set } from "src/hooks/EncrDecr";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = (props) => {
    const [appState, setAppState] = useState(InitialAppState);


    const setEmployee = (employee = {}) => {
        setAppState({
            ...appState,
            employee: employee
        })
        // const encrptedEmployee = set(JSON.stringify(employee));
        // localStorage.setItem('loginData', encrptedEmployee);
    }

    const setClients = (clientsData = [], totalCount = 15) => {
        setAppState({
            ...appState,
            clients: {
                data: clientsData,
                totalCount: totalCount,
                selectedClient: appState.clients.selectedClient
            }
        })
    }
    const setSelectedClient = (client = {}) => {
        setAppState({
            ...appState,
            clients: {
                data: appState.clients.data,
                totalCount: appState.clients.totalCount,
                selectedClient: client
            }
        })
    }

    const setBDMClients = (bdmClientsData = [], totalCount = 15) => {
        setAppState({
            ...appState,
            bdmClients: {
                data: bdmClientsData,
                totalCount: totalCount,
                selectedBDMClient: appState.bdmClients.selectedBDMClient
            }
        })
    }

    const setSelectedBDMClient = (bdmclient = {}) => {
        setAppState({
            ...appState,
            bdmClients: {
                data: appState.bdmClients.data,
                totalCount: appState.bdmClients.totalCount,
                selectedBDMClient: bdmclient
            }
        })
    }

  
    const setStatics = (statics = {}) => {
        setAppState({
            ...appState,
            statics: statics
        })
    }

    const setEmployees = (employeesData = [], totalCount = 15) => {
        setAppState({
            ...appState,
            employees: {
                data: employeesData,
                totalCount: totalCount,
                selectedEmployee: appState.employees.selectedEmployee
            }
        })
    }

    const setSelectedEmployee = (employee = {}) => {
        setAppState({
            ...appState,
            employees: {
                data: appState.employees.data,
                totalCount: appState.employees.totalCount,
                selectedEmployee: employee
            }
        })
    }
    // const [users, setUsers] = useState([]);
    // const [user, setUser] = useState({});

    // const addUserInUsers = (user) => {
    //     setUsers((users) => {
    //         if (users) {
    //             return [...users, user]
    //         } else {
    //             return [user]
    //         }
    //     });
    // }

    const logout = () => {
        logoutEmployee().then(res => {
            if (res.status === 200) {
                setAppState(InitialAppState);
            } else {
                error(res.message)
            }
        })
    }

    return (
        <AppContext.Provider value={{
            appState, setAppState, setBDMClients, setSelectedBDMClient,
            setEmployee, setClients, setSelectedClient, setStatics,
            setEmployees, setSelectedEmployee,
            logout
        }} >
            {props.children}
        </AppContext.Provider>
    );

}
