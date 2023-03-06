import React, { useEffect, useState } from 'react';
import { updateClientFromBDM } from 'src/apis/clients';
import { TextField, Grid, Box } from '@mui/material';
import CrmModel from 'src/components/Model';
import { error, success } from 'src/hooks/Toasters';
import PropTypes from 'prop-types';
import { useAppContext } from 'src/context/AppContext';
import { useAppLoaderContext } from 'src/context/LoaderContext';

const bdmClientsPayload = {
    comments: ''
}

const UpdateBDMClient = (props) => {
    const { showUpdateBDMClientModel, setShowUpdateBDMClientModel, reloadClients } = props;
    const { startLoading } = useAppLoaderContext();
    const { appState: { bdmClients }, setSelectedBDMClient } = useAppContext();
    const [details, setDetails] = useState(bdmClientsPayload);
    const [errPayload, setErrPayload] = useState({});

    useEffect(() => {
        appendDataToDetailsPayload(bdmClients.selectedBDMClient);
    }, [bdmClients.selectedBDMClient]);

    const appendDataToDetailsPayload = (client = {}) => {
        const detailPayload = {
            comments: client?.comments
        };
        setDetails(detailPayload);
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
        setShowUpdateBDMClientModel(false);
        setDetails(bdmClientsPayload);
        setSelectedBDMClient({})
    }

    const submit = (event) => {
        event.preventDefault();
        onUpdateBDMClient();
    }

    const onUpdateBDMClient = () => {
        startLoading(true);
        updateClientFromBDM(bdmClients.selectedBDMClient.clientId, details).then(res => {
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
            <CrmModel title='Update Campaign' show={showUpdateBDMClientModel} width={800} onSubmit={submit} onClose={onCloseModel}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField multiline minRows={3} maxRows={3} type="text" id="outlined-basic" label="Comments" variant="outlined" name="comments" value={details.comments} onChange={handleOnChange} size="small" fullWidth />
                    </Grid>
                </Grid>
            </CrmModel>
        </Box>
    )
}

UpdateBDMClient.propTypes = {
    showUpdateBDMClientModel: PropTypes.bool,
    setShowUpdateBDMClientModel: PropTypes.func,
    reloadClients: PropTypes.func,
}

export default UpdateBDMClient























