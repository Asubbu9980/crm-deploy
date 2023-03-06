import React, { useEffect, useState } from 'react'
import CrmTable from 'src/components/Table';
import { getBDMClients} from 'src/apis/clients';
import UpdateBDMClient from './UpdateBDMClient';
import { ButtonGroup, Button, Box, Typography, TextField, Grid, InputAdornment } from '@mui/material';
import { useAppContext } from 'src/context/AppContext';
import { useAppLoaderContext } from 'src/context/LoaderContext';
import useDebounce from 'src/hooks/Debounce';


//ICONS
import SearchIcon from '@mui/icons-material/Search';


const theaders = [
  { label: "Id", field: "clientId", type: "text" },
  { label: "Company Name", field: "companyName", type: "text" },
  { label: "First Name", field: "firstName", type: "text" },
  { label: "Last Name", field: "lastName", type: "text", },
  { label: "Email", field: "email", type: "text" },
  { label: "Mobile", field: "mobile", type: "text" },
  { label: "Job Title", field: "jobTitle", type: "text" },
  { label: "Designation", field: "designation", type: "text" },
  { label: "CompanyURL", field: "companyURL", type: "link" },
  { label: "Job Link", field: "jobLink", type: "link" },
  { label: "Status", field: "status", type: "status" },
  { label: "Comments", field: "comments", type: "text" },
  { label: "Actions", editBtn: true, field: "actions", type: "actions", stickyRight: true},
]

const defaultPagination = {
  defaultRowsPerPage: 20,
  defaultPage: 0
}

const BDMClients = () => {
  const { startLoading } = useAppLoaderContext();
  const [showUpdateBDMClientModel, setShowUpdateBDMClientModel] = useState(false);
  const [tableHeaders, setTableHeaders] = useState([...theaders]);
  const [pagination, setPagination] = useState(defaultPagination);
  const { appState: { bdmClients,employee, statics }, setBDMClients, setSelectedBDMClient } = useAppContext();
  const [search, setSearch] = useState('');
  const { debouncedValue: searchTerm } = useDebounce(search, 500);
  const [clientStatus, setClientStatus] = useState('all');

  


  useEffect (()=>{
    reloadClients()
  },
  [statics, searchTerm, clientStatus])

  const reloadClients = ({ defaultPage, defaultRowsPerPage } = pagination) => {
    setPagination({
      defaultRowsPerPage: defaultRowsPerPage,
      defaultPage: defaultPage
    });
    onPageChange({
      page: defaultPage,
      rowsPerPage: defaultRowsPerPage,
      defaultRowsPerPage: defaultRowsPerPage
    })
  }

  const onPageChange = (event) => {
    let limit = event.rowsPerPage;
    let skip = (event.page * event.rowsPerPage);
    setPagination({
      defaultRowsPerPage: event.rowsPerPage,
      defaultPage: event.page
    })
    getBDMClientsData(limit, skip);
  }

  const getBDMClientsData = (limit, skip) => {
    startLoading(true)
    getBDMClients(limit, skip, searchTerm, clientStatus).then(res => {
      startLoading(false)
      if (res.status === 200) {
        setBDMClients(res.data.clients, res.data.totalCount);
      }
    })
  }

  const onClickEditBtn = (event) => {
    if (event.row._id) {
      setSelectedBDMClient(event.row);
      setShowUpdateBDMClientModel(true);
    }
  }

  return (
    <Box>
      <Box className="mb-3">
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Typography variant="h5" >Campaigns </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField type="text" id="outlined-basic" label="Search" variant="outlined" value={search} onChange={(e) => { setSearch(e.target.value) }} name="search" size="small" fullWidth
              className='bg-white'
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mb={1}>
        <Grid container spacing={2}>
          <Grid item md={12} lg={employee?.role === statics?.empRoles?.manager ? 6 : 12}>
            <ButtonGroup variant="outlined" >
              <Button variant={clientStatus === 'all' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('all') }}>All</Button>
              <Button variant={clientStatus === 'sent' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('sent') }}>Sent</Button>
              <Button variant={clientStatus === 'opended' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('opended') }}>Opended</Button>
              <Button variant={clientStatus === 'clicked' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('clicked') }}>Clicked</Button>
              <Button variant={clientStatus === 'no-response' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('no-response') }}>No Response</Button>
              <Button variant={clientStatus === 'positive-response' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('positive-response') }}>Positive Response</Button>
              <Button variant={clientStatus === 'dnd' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('dnd') }}>Do Not Distrub</Button>
              <Button variant={clientStatus === 'failed' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('failed') }}>Failed</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
      <UpdateBDMClient showUpdateBDMClientModel={showUpdateBDMClientModel} setShowUpdateBDMClientModel={() => { setShowUpdateBDMClientModel(false) }}   reloadClients={reloadClients}/>
      <CrmTable theaders={tableHeaders} 
        tbody={bdmClients.data}
        totalCount={bdmClients.totalCount}
        onClickEditBtn={onClickEditBtn}
        autoPagination={false} defaultPage={pagination.defaultPage} defaultRowsPerPage={pagination.defaultRowsPerPage} onPageChange={onPageChange}
      />
    </Box>
  )
}

export default BDMClients;
