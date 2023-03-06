import React, { useEffect, useState } from "react";
import { Box, TextField, Grid, RadioGroup, Radio, FormControlLabel, FormLabel, MenuItem, FormHelperText, FormControl, Autocomplete } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { error, success } from 'src/hooks/Toasters';
import { createEmployee, updateEmployee } from 'src/apis/employees';
import CrmModel from 'src/components/Model';
import PropTypes from 'prop-types';
import { useAppContext } from 'src/context/AppContext';
import { useAppLoaderContext } from 'src/context/LoaderContext';

const EmployeeDefaultData = {
    companyName: "",
    employeeName: "",
    employeeCode: "",
    designation: "",
    officeLocation: "",
    workLocation: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    skills: [],
    desiredSkills: "",
    address: "",
    role: "",
    countryCode: "+91",
    password: "test@123",
    department: "",
    reportingTo: '',
    manager: {}
}

const countryCodes = require('src/statics/CountryCodes.json');

export default function CreateEmployee(props) {

    const { createEmpModalShow, createEmpModalHide, editmode = false, reloadEmp } = props;
    const { appState: { statics, employees }, setSelectedEmployee } = useAppContext();
    const { startLoading } = useAppLoaderContext();
    const [empPayload, setEmpPayload] = React.useState({...EmployeeDefaultData});
    const [errorPayload, setErrorPayload] = useState({});
    const [empReportsList, setEmpReportsList] = useState([]);
    const [reportingToOptions, setReportingToOptions] = useState([]);
    const [reportingTo, setReportingTo] = useState(null);


    useEffect(() => {
        if (employees.data) {
            const emplist = employees.data.map(emp => {
                return {
                    employeeName: emp.employeeName,
                    _id: emp._id,
                    role: emp.role,
                    employeeCode: emp.employeeCode,
                    employeeSNO: emp.employeeSNO,
                }
            });
            setEmpReportsList([...emplist]);
            setReportingToOptions([...emplist])
        }
    }, [employees.data]);
   
    useEffect(()=>
    {
        if (editmode) {
                    appendDataToDetailsPayload(employees.selectedEmployee);
                }
                else{
                    setEmpPayload({...EmployeeDefaultData})
                }
    },[employees.selectedEmployee,editmode])


    const appendDataToDetailsPayload = (employee = {}) => {
        const empDetailPayload = {
            companyName: employee?.companyName,
            employeeName: employee?.employeeName,
            employeeCode: employee?.employeeCode,
            designation: employee?.designation,
            officeLocation: employee?.officeLocation,
            workLocation: employee?.workLocation,
            email: employee?.email,
            mobile: employee?.mobile,
            dob: employee?.dob,
            gender: employee?.gender,
            maritalStatus: employee?.maritalStatus,
            skills: employee?.skills,
            desiredSkills: employee?.desiredSkills,
            address: employee?.address,
            role: employee?.role,
            countryCode: employee?.countryCode,
            department: employee?.department,
            reportingTo: employee?.manager?._id,
            manager: employee?.manager
        };
        setEmpPayload({...empDetailPayload});
    }
    const onChangeHandler = (e) => {        
        if (e.target.name === 'role') {
            setEmpPayload({
                ...empPayload,
                [e.target.name]: e.target.value,['reportingTo']:""
            });
        }

        else {
            setEmpPayload({
                ...empPayload,
                [e.target.name]: e.target.value
            });
        }

        setErrorPayload({
            ...errorPayload,
            [e.target.name]: e.target.value
        });
    }

    const validateEmpPayload = () => {
        if ((empPayload.employeeName === "" ||
            empPayload.employeeCode === "" ||
            empPayload.companyName === "" ||
            empPayload.designation === "" ||
            empPayload.email === "" ||
            empPayload.role === "" ||
            empPayload.department === "" ||
            empPayload.gender === "" ||
            empPayload.reportingTo === ''
        )) {
            return false;
        }
        else {
            return true
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (validateEmpPayload()) {
            if (editmode) {
                onUpdateEmployee();
            }
            else {
                onAddEmployee();
            }
        }
        else {
            setErrorPayload(empPayload);
        }
    }
    const onAddEmployee = () => {
        startLoading(true);
        createEmployee(empPayload).then(res => {
            startLoading(false);
            if (res.status === 200) {
                success('Employee created successfully');
                createEmpModalHide();
                setEmpPayload({...EmployeeDefaultData});
                setReportingTo(null);
                reloadEmp();
            }
            else {
                error(res.message)
            }
        })
    }

    const onUpdateEmployee = () => {
        startLoading(true);
        updateEmployee(employees.selectedEmployee.employeeSNO, empPayload).then(res => {
            startLoading(false);
            if (res.status === 200) {
                success(res.message);
                createEmpModalHide();
                setEmpPayload(EmployeeDefaultData);
                setReportingTo(null);
                reloadEmp();
            } else {
                error(res.message);
            }
        })
    }

    const onCloseModal = () => {
        createEmpModalHide(); 
        setSelectedEmployee({...EmployeeDefaultData})
        setErrorPayload({});
        setReportingTo(null);
        setEmpPayload({...EmployeeDefaultData});
    }

    useEffect(() => {
        if (empPayload?.role && empReportsList.length) {

            let empList = [];

            if (empPayload.role === statics.empRoles.teamlead || empPayload.role === statics.empRoles.bdmTeamlead || empPayload.role === statics.empRoles.manager) {
                empList = empReportsList.filter(emp => emp.role === statics.empRoles.manager);
            }
            else if (empPayload.role === statics.empRoles.associate) {
                empList = empReportsList.filter(emp => emp.role === statics.empRoles.teamlead);
            }
            else {
                // (empPayload.role === statics.empRoles.bdmAssociate) 
                empList = empReportsList.filter(emp => emp.role === statics.empRoles.bdmTeamlead);
            }

            let empManager = empList.find(emp => emp._id === empPayload?.manager?._id);
            if (empManager) {
                setReportingTo(empManager);
            }
            setReportingToOptions(empList);
        }
    }, [empPayload.role, empReportsList])

    return (
        <CrmModel title={editmode ? 'Update employee' : 'Add employee'}
            show={createEmpModalShow}
            onClose={onCloseModal}
            onSubmit={submitHandler}
            width={900}  >
            <Box component={'form'} onSubmit={submitHandler}>
                <Grid container spacing={3} >
                    <Grid item alignContent={"center"} xs={6} >
                        <TextField value={empPayload.companyName} label="Company Name" size="small" fullWidth name={"companyName"} onChange={onChangeHandler}
                            error={errorPayload && errorPayload.companyName === ""} helperText={errorPayload && errorPayload.companyName === "" ? "Employee Company Name Required" : ""} />
                    </Grid>

                    <Grid item alignContent={"center"} xs={6} >
                        <TextField label="Employee Name" required value={empPayload.employeeName} size="small" fullWidth name={"employeeName"}
                            error={errorPayload && errorPayload.employeeName === ""}
                            helperText={errorPayload && errorPayload.employeeName === "" ? "Employee Name Required" : ""} onChange={onChangeHandler} />
                    </Grid>

                    <Grid item alignContent={"center"} xs={6} >
                        <TextField value={empPayload.employeeCode} label="Employee Code" size="small" fullWidth name={"employeeCode"} required
                            onChange={onChangeHandler} helperText={errorPayload && errorPayload.employeeCode === "" ? "Employee Code Required" : ""}
                            error={errorPayload && errorPayload.employeeCode === ""} />
                    </Grid>
                    <Grid item alignContent={"center"} xs={6} >
                        <TextField label="Email" required value={empPayload.email} size="small" fullWidth name={"email"} onChange={onChangeHandler}
                            error={errorPayload && errorPayload.email === ""} helperText={errorPayload && errorPayload.email === "" ? "Employee Email Required" : ""}
                        />
                    </Grid>

                    <Grid item alignContent={"center"} xs={6} >
                        <TextField name={"role"} required label={"Role"} value={empPayload.role} select fullWidth size="small" onChange={(e) => {

                            setReportingTo(null);
                            onChangeHandler(e);
                        }}
                            error={errorPayload && errorPayload.role === ""} helperText={errorPayload && errorPayload.role === "" ? "Employee Role Required" : ""}
                        >
                            {
                                statics.empRoles && Object.entries(statics.empRoles).map((item, index) =>
                                    <MenuItem key={index} value={item[0]} >{item[0].charAt(0).toUpperCase() + item[0].slice(1)}</MenuItem>)
                            }
                        </TextField>
                    </Grid>
                    <Grid item alignContent={"center"} xs={6} >
                        <Autocomplete
                            onChange={(event, emp) => {
                                setReportingTo(emp);
                                setEmpPayload({ ...empPayload, ['reportingTo']: emp ? emp._id : "" });
                                setErrorPayload({ ...errorPayload, ['reportingTo']: emp ? emp?._id : '' });
                            }}
                            value={reportingTo}
                            disabled={empPayload.role ? false : true}
                            options={reportingToOptions}
                            getOptionLabel={(option) => option?.employeeName}
                            renderInput={(params) => <TextField {...params} label="ReportsTo" name="reportsTo" size="small"
                                error={errorPayload && errorPayload.reportingTo === ""}
                                helperText={errorPayload && errorPayload.reportingTo === "" ? "Employee ReportsTo Required" : ""}
                            />}
                        />

                    </Grid>
                    <Grid item alignContent={"center"} xs={6} >
                        <TextField value={empPayload.designation} label="Designation" size="small" required fullWidth name={"designation"}
                            error={errorPayload && errorPayload.designation === ""} helperText={errorPayload && errorPayload.designation === "" ? "Employee Designation Required" : ""}
                            onChange={onChangeHandler} />
                    </Grid>

                    <Grid item alignContent={"center"} xs={6} >

                        <TextField value={empPayload.department} label="Department" size="small" fullWidth name="department" onChange={onChangeHandler} required helperText={errorPayload && errorPayload.department === "" ? "Employee Department Required" : ""} error={errorPayload && errorPayload.department === ""} />
                    </Grid>

                    <Grid item alignContent={"center"} xs={6} >

                        <TextField value={empPayload.officeLocation} label="Office Location" size="small" fullWidth name="officeLocation" onChange={onChangeHandler} />
                    </Grid>

                    <Grid item alignContent={"center"} xs={6} >
                        <TextField label="Work Location" value={empPayload.workLocation} size="small" fullWidth name={"workLocation"} onChange={onChangeHandler} />
                    </Grid>
                    <Grid item alignContent={"center"} xs={2.5} >
                        <TextField label={'select country'} value={empPayload.countryCode} name={'countryCode'} onChange={onChangeHandler} select fullWidth size={'small'}>
                            {
                                countryCodes.map((item, index) =>
                                    <MenuItem value={item.dial_code} key={index}>
                                        {item.name}
                                    </MenuItem>
                                )
                            }
                        </TextField>
                    </Grid>
                    <Grid item alignContent={"center"} xs={3.5} >
                        <TextField value={empPayload.mobile} label="Mobile number" size="small" fullWidth name={"mobile"} inputProps={{ maxLength: 10 }} onChange={onChangeHandler} />
                    </Grid>

                    <Grid item alignContent={"center"} xs={6} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                inputFormat="DD/MM/YYYY"
                                label="Date of Birth"
                                value={empPayload.dob && empPayload.dob ? new Date(empPayload.dob) : new Date().valueOf() - 18 * 365 * 24 * 60 * 60 * 1000}
                                onChange={(newValue) => {
                                    setEmpPayload({ ...empPayload, "dob": new Date(newValue.$d) })
                                }}
                                renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                                maxDate={new Date().valueOf() - 18 * 365 * 24 * 60 * 60 * 1000}
                            />
                        </LocalizationProvider>
                    </Grid>
                    {/* <Grid item alignContent={"center"} xs={6} >
                        <TextField label="password" disabled value={"Test@123"} size="small" fullWidth name={"password"} onChange={onChangeHandler} />
                    </Grid> */}

                    <Grid item alignContent={"center"} xs={6} >
                        <TextField value={empPayload.maritalStatus} label="Martial status" size="small" fullWidth name={"maritalStatus"} onChange={onChangeHandler} />
                    </Grid>

                    <Grid item alignContent={"center"} xs={6} >
                        <FormControl error={errorPayload && errorPayload.gender === ""}>
                            <Box display={'flex'} alignItems={'center'} >
                                <FormLabel sx={{ marginRight: 2 }}>Gender</FormLabel>
                                <RadioGroup row onChange={onChangeHandler}
                                    value={empPayload.gender}
                                >
                                    {
                                        statics.genders && statics.genders.map((item, index) =>
                                            <FormControlLabel key={index} value={item} name="gender" control={<Radio />} label={item} />)
                                    }
                                </RadioGroup>
                            </Box>{
                                errorPayload && errorPayload.gender === "" ? <FormHelperText>Employee Gender Required</FormHelperText> : ""
                            }
                        </FormControl>
                    </Grid>


                    <Grid item alignContent={"center"} xs={12} >
                        <TextField multiline name="address" value={empPayload.address} fullWidth label="Address" rows={3} onChange={onChangeHandler} />
                    </Grid>
                </Grid>
            </Box>           
        </CrmModel>
    )
}

CreateEmployee.propTypes = {
    editmode: PropTypes.bool
}