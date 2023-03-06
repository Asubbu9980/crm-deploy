import React from 'react'
import { useAppContext } from 'src/context/AppContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Home
import Home from 'src/containers/Home';
import LandingPage from 'src/containers/Home/LandingPage';
import Login from 'src/containers/Home/Login';

//Dashboard
import Dashboard from 'src/containers/Dashboard';
import Clients from 'src/containers/Dashboard/Clients';
import Analytics from 'src/containers/Dashboard/Analytics';
import MyProfile from './containers/Dashboard/MyProfile';
import Employees from './containers/Dashboard/Employee';
import BDMClients from './containers/Dashboard/BDM';

const PageNotFound = <h4>Page Not Found!</h4>

const AppRoots = () => {
    const { appState: { employee, statics } } = useAppContext();

    const canRootActivate = (accessTo = [], role) => accessTo.includes(role);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} >
                    <Route path="" element={<LandingPage />} />
                    <Route path="login" element={<Login />} />
                </Route>
                <Route path="/dashboard" element={<Dashboard />} >
                    <Route path={"analytics"} element={<Analytics />} />
                    <Route path={"myprofile"} element={<MyProfile />} />
                    <Route path={"clients"} element={
                        canRootActivate([statics?.empRoles?.manager, statics?.empRoles?.teamlead, statics?.empRoles?.associate], employee?.role) ? <Clients /> : PageNotFound } />
                    <Route path={"bdmclients"} element={
                        canRootActivate([statics?.empRoles?.bdmTeamlead, statics?.empRoles?.bdmAssociate], employee?.role) ? <BDMClients /> : PageNotFound} />
                    <Route path={"employees"} element={
                        canRootActivate([statics?.empRoles?.manager], employee?.role) ? <Employees /> : PageNotFound
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoots;