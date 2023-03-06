import React, { useEffect, useState } from 'react'
import CrmTable from 'src/components/Table';
import { getClients, deleteClient, assignToBDM, } from 'src/apis/clients';
import { getAllBDMEmployees } from 'src/apis/employees';
import { ButtonGroup, Button, Box, Typography, TextField, Grid, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddClient from './AddClient';
import UploadFile from './UploadFile'
import AddIcon from '@mui/icons-material/ControlPoint';
import { useAppContext } from 'src/context/AppContext';
import { error, success } from 'src/hooks/Toasters';
import { useAppLoaderContext } from 'src/context/LoaderContext';
import useDebounce from 'src/hooks/Debounce';


//ICONS
import SearchIcon from '@mui/icons-material/Search';
import PublishIcon from '@mui/icons-material/Publish';



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
  { label: "Created By", field: "createdBy.employeeName", type: "text" },
  { label: "Created Date", field: "createdDate", type: "date" },
  { label: "Status", field: "status", type: "status" },
  { label: "Comments", field: "comments", type: "text" },
  { label: "Actions", editBtn: true, deleteBtn: true, field: "actions", type: "actions", stickyRight: true, },
]

const defaultPagination = {
  defaultRowsPerPage: 20,
  defaultPage: 0
}

const Clients = () => {
  const { startLoading } = useAppLoaderContext();
  const [showAddClientModel, setShowAddClientModel] = useState(false);
  const [showUploadFileModel, setShowUploadFileModel] = useState(false);
  const [tableHeaders, setTableHeaders] = useState([...theaders]);
  const [pagination, setPagination] = useState(defaultPagination);
  const { appState: { clients, employee, statics}, setClients, setSelectedClient, } = useAppContext();
  const [editClient, setEditClient] = useState(false);
  const [search, setSearch] = useState('');
  const { debouncedValue: searchTerm } = useDebounce(search, 500);
  const [clientStatus, setClientStatus] = useState('all');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [bdmEmployees, setBDMEmployees] = useState([]);


  useEffect(() => {
    if (employee) {
      if (employee.role === statics?.empRoles?.manager) {
        const editableTHeaders = [...theaders]
        editableTHeaders.splice(0, 0, { label: "", field: "clientId", type: "checkbox", value: false, stickyLeft: true })
        editableTHeaders.splice(editableTHeaders.length - 1, 0,
          { label: "Assigned By", field: "assignedBy.employeeName", type: "text" },
          { label: "Assigned To", field: "assignedTo.employeeName", type: "text" },
        )
        setTableHeaders(editableTHeaders)
      }
      reloadClients();
    }
  }, [statics, searchTerm, clientStatus])

  useEffect(() => {
    if (employee.role === statics?.empRoles?.manager) {
      getbdmEmployees();
    }
  }, [statics])

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
    getClientsData(limit, skip);
  }

  const getClientsData = (limit, skip) => {
    startLoading(true)
    getClients(limit, skip, searchTerm, clientStatus).then(res => {
      startLoading(false)
      if (res.status === 200) {
        setClients(res.data.clients, res.data.totalCount);
      }
    })
  }

  const getbdmEmployees = () => {
    getAllBDMEmployees().then(res => {
      if (res.status === 200) {
        setBDMEmployees(res.data);
      }
    });
  }

  useEffect(() => {
    if (selectAll) {
      onSelectAll(selectAll, {})
    }
  }, [clients.data])

   const onSelectRow = (value, event) => {
    let clientIds = [...selectedRows];
    if (value) {
      clientIds.push(event.row.clientId);
    } else {
      const indexForUnselect = clientIds.indexOf(event.row.clientId);
      if (indexForUnselect !== -1) {
        clientIds.splice(indexForUnselect, 1);
      }
    }

    setSelectedRows([...clientIds]);
    if (clients.data.length === clientIds.length) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }

  const onSelectAll = (value, event) => {
    setSelectAll(value)
    let clientIds = [];
    if (value) {
      clientIds = clients.data.map(client => client.clientId)
    }
    setSelectedRows([...clientIds])
  }

  const onAssignToBDM = () => {
    const reqBody = {
      selectAll,
      search: searchTerm,
      status: clientStatus,
      clientIds: selectedRows,
      assignedTo
    }
    startLoading(true)
    assignToBDM(reqBody).then(res => {
      startLoading(false)
      if (res.status === 200) {
        success(res.message)
        reloadClients();
        setAssignedTo("");
      } else {
        error(res.message)
      }
    })
  }
  const onClickEditBtn = (event) => {
    if (event.row._id) {
      setSelectedClient(event.row);
      setEditClient(true);
      setShowAddClientModel(true);
    }
  }

  const onClickDeleteBtn = (event) => {
    deleteClient(event.row.clientId).then(res => {
      if (res.status === 200) {
        success(res.message);
        let updatedPagination = pagination;
        if (clients.data.length === 1) {
          updatedPagination = {
            defaultRowsPerPage: pagination.defaultRowsPerPage,
            defaultPage: pagination.defaultPage === 0 ? pagination.defaultPage : pagination.defaultPage - 1
          }
        }
        reloadClients(updatedPagination);

      } else {
        error(res.message);
      }
    });
  }


  return (
    <Box>
      <Box className="mb-3">
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Typography variant="h5" > Clients </Typography>
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
          <Grid item xs={12} md={4} textAlign={'end'}  >
            <Button sx={{ mr: 1 }} variant="contained" onClick={() => { setShowAddClientModel(true); setEditClient(false) }}
              startIcon={<AddIcon />} className="text-white">Add Client</Button>
            <Button variant="contained" onClick={() => { setShowUploadFileModel(true) }} startIcon={<PublishIcon />}
              className="text-white">UploadFile</Button>
          </Grid>
        </Grid>
      </Box>

      <Box mb={1}>
        <Grid container spacing={2}>
          <Grid item md={12} lg={employee?.role === statics?.empRoles?.manager ? 6 : 12}>
            <ButtonGroup variant="outlined" >
              <Button variant={clientStatus === 'all' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('all'); setPagination(defaultPagination) }}>All</Button>
              <Button variant={clientStatus === 'assigned' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('assigned'); setPagination(defaultPagination) }}>Assigned</Button>
              <Button variant={clientStatus === 'no-response' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('no-response'); setPagination(defaultPagination) }}>No Response</Button>
              <Button variant={clientStatus === 'positive-response' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('positive-response'); setPagination(defaultPagination) }}>Positive Response</Button>
              <Button variant={clientStatus === 'dnd' ? 'contained' : 'outlined'} onClick={() => { setClientStatus('dnd'); setPagination(defaultPagination) }}>Do Not Distrub</Button>
            </ButtonGroup>
          </Grid>
          {employee?.role === statics?.empRoles?.manager ?
            <Grid item md={12} lg={6}>
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <FormControl fullWidth size="small" className='bg-white' disabled={!selectedRows.length}>
                    <InputLabel id="select-bdm-teamlead">Assignee</InputLabel>
                    <Select labelId="select-bdm-teamlead" id="select-bdm-teamlead" value={assignedTo}
                      label="Assignee" onChange={(e) => { setAssignedTo(e.target.value) }}  >
                      {
                        bdmEmployees.length > 0 && bdmEmployees?.map((emp, index) =>
                          <MenuItem value={emp._id} key={index}>
                            {emp.employeeName}({emp.employeeCode})
                          </MenuItem>
                        )
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <Button variant={'contained'} fullWidth disabled={!selectedRows.length || !assignedTo} onClick={onAssignToBDM}>Assign to BDM</Button>
                </Grid>
              </Grid>
            </Grid> : null
          }
        </Grid>
      </Box>
      <AddClient showAddClientModel={showAddClientModel} setShowAddClientModel={() => { setShowAddClientModel(false); setEditClient(false) }} reloadClients={reloadClients}
        editmode={editClient} />
      <UploadFile showUploadFileModel={showUploadFileModel} setShowUploadFileModel={() => { setShowUploadFileModel(false); }}
        reloadClients={reloadClients} />
      <CrmTable theaders={tableHeaders} tbody={clients.data}
        totalCount={clients.totalCount}
        onClickEditBtn={onClickEditBtn} onClickDeleteBtn={onClickDeleteBtn}
        autoPagination={false} defaultPage={pagination.defaultPage} defaultRowsPerPage={pagination.defaultRowsPerPage} onPageChange={onPageChange}
        onSelectRow={onSelectRow} onSelectAll={onSelectAll} selectedRows={selectedRows} selectAll={selectAll}
      />
    </Box>
  )
}

export default Clients;
