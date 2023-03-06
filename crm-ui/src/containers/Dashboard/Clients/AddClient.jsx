import React, { useEffect, useState } from 'react';
import { createClients, updateClient } from 'src/apis/clients';
import { TextField, Grid, Box, MenuItem } from '@mui/material';
import CrmModel from 'src/components/Model';
import { error, success } from 'src/hooks/Toasters';
import PropTypes from 'prop-types';
import { useAppContext } from 'src/context/AppContext';
import { useAppLoaderContext } from 'src/context/LoaderContext';

const clientsPayload = {
    companyName: '',
    jobTitle: '',
    firstName: '',
    lastName: '',
    designation: '',
    email: '',
    mobile: '',
    location: '',
    jobLink: '',
    companyURL: '',
    status: '',
    comments:''
}

const AddClient = (props) => {
    const { showAddClientModel, setShowAddClientModel, reloadClients, editmode = false } = props;
    const { startLoading } = useAppLoaderContext();
    const { appState: { clients, statics }, setSelectedClient } = useAppContext();
    const [details, setDetails] = useState(clientsPayload);
    const [errPayload, setErrPayload] = useState({});
    const [clientStatus, setClientStatus] = useState([])

    useEffect(() => {
        if (editmode) {
            appendDataToDetailsPayload(clients.selectedClient);
        }
    }, [clients.selectedClient]);

    useEffect(() => {
        if (statics?.clientStatus) {
            setClientStatus(statics.clientStatus);
        }
    }, [statics]);

    const appendDataToDetailsPayload = (client = {}) => {
        const detailPayload = {
            companyName: client?.companyName,
            jobTitle: client?.jobTitle,
            firstName: client?.firstName,
            lastName: client?.lastName,
            designation: client?.designation,
            email: client?.email,
            mobile: client?.mobile,
            location: client?.location,
            status: client?.status,
            jobLink: client?.jobLink,
            companyURL: client?.companyURL,
            comments:client?.comments
        };

        setDetails(detailPayload);
        setErrPayload(detailPayload);
    }

    const handleOnChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });

        setErrPayload({
            ...errPayload,
            [e.target.name]: e.target.value
        })
    }

    const onCloseModel = () => {
        setShowAddClientModel(false);
        setDetails(clientsPayload);
        setErrPayload({});
        setSelectedClient({});
    }

    const validateDetailsPayload = () => {
        if (details.companyName === "" ||
            details.jobTitle === "" ||
            details.email === ""||
            details.status==="") {
            return false
        }
        return true
    }

    const submit = (event) => {
        event.preventDefault();
        if (validateDetailsPayload()) {
            if (editmode) {
                onUpdateClient();
            } 
            else {
                onAddClient();
            }
        } 
        else {
            setErrPayload(details);
        }
    }

    const onAddClient = () => {
        startLoading(true);
        createClients(details).then(res => {
            startLoading(false);
            if (res.status === 200) {
                success(res.message);
                setTimeout(() => {
                    onCloseModel();
                    reloadClients();
                });
            } else {
                error(res.message);
            }
        })
    }

    const onUpdateClient = () => {
        startLoading(true);
        updateClient(clients.selectedClient.clientId, details).then(res => {
            startLoading(false);
            if (res.status === 200) {
                success(res.message);
                setTimeout(() => {
                    onCloseModel();
                    reloadClients();
                });
            } else {
                error(res.message);
            }
        })
    }

    return (
        <Box>
            <CrmModel title={editmode ? 'Update Client' : 'Add Client'} show={showAddClientModel} width={800} onSubmit={submit} onClose={onCloseModel}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField type="text" id="outlined-basic" label="Company Name" variant="outlined" name='companyName' value={details.companyName} onChange={handleOnChange}
                            error={errPayload && errPayload.companyName === ''} helperText={(errPayload && errPayload.companyName === '') ? 'Company Name Required' : ''} size="small" fullWidth required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="text" id="outlined-basic" label="Job Title" variant="outlined" name='jobTitle' value={details.jobTitle} onChange={handleOnChange}
                            error={errPayload && errPayload.jobTitle === ''} helperText={(errPayload && errPayload.jobTitle === '') ? 'Job Title Required' : ""} size="small" fullWidth required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="text" id="outlined-basic" label="First Name" variant="outlined" name="firstName" value={details.firstName} onChange={handleOnChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="text" id="outlined-basic" label="Last Name" variant="outlined" name="lastName" value={details.lastName} onChange={handleOnChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="text" id="outlined-basic" label="Email" variant="outlined" name="email" value={details.email} onChange={handleOnChange}
                            error={errPayload && errPayload.email === ''} helperText={(errPayload && errPayload.email === '') ? 'Email Required' : ""} size="small" fullWidth required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="text" id="outlined-basic" label="Phone Number" variant="outlined" name="mobile" value={details.mobile} onChange={handleOnChange} inputProps={{ maxLength: 10 }} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="text" id="outlined-basic" label="Designation" variant="outlined" name="designation" value={details.designation} onChange={handleOnChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="text" id="outlined-basic" label="Job Location" variant="outlined" name="location" value={details.location} onChange={handleOnChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Status" variant="outlined" name="status" value={details.status} onChange={handleOnChange} select size="small" fullWidth required
                            error={errPayload && errPayload.status === ''} helperText={errPayload && errPayload.status === ''?'Status Required':""}
                        >
                            {clientStatus && clientStatus.map((clientStatusItem, index) =>
                                <MenuItem value={clientStatusItem} key={index}>{clientStatusItem}</MenuItem>
                            )}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="text" id="outlined-basic" label="Job Link" variant="outlined" name="jobLink" value={details.jobLink} onChange={handleOnChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="text" id="outlined-basic" label="Company URL" variant="outlined" name="companyURL" value={details.companyURL} onChange={handleOnChange} size="small" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField multiline minRows={3} maxRows={3} type="text" id="outlined-basic" label="Comments" variant="outlined" name="comments" value={details.comments} onChange={handleOnChange} size="small" fullWidth />
                    </Grid>
                </Grid>
            </CrmModel>            
        </Box>
    )
}

AddClient.propTypes = {
    showAddClientModel: PropTypes.bool,
    setShowAddClientModel: PropTypes.func,
    reloadClients: PropTypes.func,
    editmode: PropTypes.bool,
   
}

export default AddClient
