import { Box, Grid, Typography, TextField, InputAdornment, Button } from "@mui/material";
import React, { useEffect, useState } from 'react'
import CrmTable from 'src/components/Table/index';
import { useAppLoaderContext } from 'src/context/LoaderContext';
import { getAllEmployees, deleteEmployee } from 'src/apis/employees';
import CreateEmployee from "./CreateEmployee";
import { useAppContext } from "src/context/AppContext";
import { error, success } from 'src/hooks/Toasters';
import useDebounce from 'src/hooks/Debounce';


//ICONS
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/ControlPoint';

const theaders = [
    { label: "SNO", field: "employeeSNO", type: "text" },
    { label: "Employee Code", field: "employeeCode", type: "text" },
    { label: "Employee Name", field: "employeeName", type: "text" },
    { label: "Company Name", field: "companyName", type: "text" },
    { label: "Designation", field: "designation", type: "text" },
    { label: "Email", field: "email", type: "text" },
    { label: "Manager", field: "manager.employeeName", type: "text" },
    { label: "Role", field: "role", type: "text" },
    { label: "Department", field: "department", type: "text" },
    { label: "Mobile", field: "mobile", type: "text" },
    { label: "Office Location", field: "officeLocation", type: "text" },
    { label: "Work Location", field: "workLocation", type: "text" },
    { label: "DateOfBirth", field: "dob", type: "date" },
    { label: "Gender", field: "gender", type: "text" },
    { label: "Marital Status", field: "maritalStatus", type: "text" },
    { label: "Actions", editBtn: true, deleteBtn: true, field: "actions", type: "actions", stickyRight: true }
]


const Employees = () => {
    const { startLoading } = useAppLoaderContext();
    const { appState: { employee, statics, employees }, setEmployees, setSelectedEmployee } = useAppContext();
    const [tableHeaders, setTableHeaders] = useState([...theaders]);
    const [showCreateEmployee, setShowCreateEmployee] = useState(false);
    const [editEmployee, setEditEmployee] = useState(false);
    const [employeeData, setEmployeeData] = useState([]);
    const [search, setSearch] = useState('');
    const { debouncedValue: searchTerm } = useDebounce(search, 500);


    const reloadEmployees = () => {
        getAllEmployeesData();
    }

    const modalHide = () => {
        setShowCreateEmployee(!showCreateEmployee);
    }
    useEffect(() => {
        if (employee && statics && statics?.empRoles?.manager === employee.role) {
            getAllEmployeesData()
        }
    }, [statics])

    useEffect(() => {
        if (search.length === 0) {
            setEmployeeData(employees.data);
        } else {
            const value = search.toLowerCase()
            const filteringFields = [
                'employeeSNO', 'employeeCode', 'employeeName', 'companyName', 'mobile', 'designation', 'email', 'department'
            ]

            const filteredEmployees = employees.data.filter(item => {
                const matchedEmployees = filteringFields.filter(field => {
                    return item[field].toLowerCase().includes(value)
                })
                return matchedEmployees.length !== 0 ? true : false;
            });
            setEmployeeData(filteredEmployees);
        }
    }, [searchTerm])



    const getAllEmployeesData = () => {
        startLoading(true)
        getAllEmployees().then(res => {
            startLoading(false)
            if (res.status === 200) {
                setEmployees(res.data, res.data.length);
                setEmployeeData(res.data)
            }
        })
    }



    const onClickEditBtn = (event) => {
        if (event.row._id) {
            setSelectedEmployee(event.row);
            setEditEmployee(true);
            setShowCreateEmployee(true);

        }
    }


    const onClickDeleteBtn = (event) => {
        deleteEmployee(event.row.employeeSNO).then(res => {
            if (res.status === 200) {
                success(res.message);
                getAllEmployeesData()
            }
            else {
                error(res.message);
            }
        });
    }


    return (<Box>
        <Box className="mb-3">
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Typography variant="h5" > Employees </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type="text" id="outlined-basic" label="Search" variant="outlined" value={search} onChange={(e) => { setSearch(e.target.value) }} name="search" size="small" fullWidth
                        sx={{ background: '#ffffff' }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={3} textAlign={'end'}  >
                    <Button sx={{ mr: 1 }} variant="contained"
                        onClick={() => { setShowCreateEmployee(true); setEditEmployee(false) }}
                        startIcon={<AddIcon />} className="text-white">Add employee</Button>
                </Grid>

                <CreateEmployee createEmpModalShow={showCreateEmployee} createEmpModalHide={modalHide} onClick={() => { setEditEmployee(true); }} editmode={editEmployee} reloadEmp={reloadEmployees} />
            </Grid>
        </Box>
        <CrmTable theaders={tableHeaders} tbody={employeeData} totalCount={employees.totalCount} onClickDeleteBtn={onClickDeleteBtn} onClickEditBtn={onClickEditBtn} defaultRowsPerPage={20} onPageChange={(e) => { }} autoPagination={true} />
    </Box>
    )

}
export default Employees;