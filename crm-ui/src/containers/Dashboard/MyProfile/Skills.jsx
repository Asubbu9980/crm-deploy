import React, { useState } from 'react'
import { Card, CardContent, Divider, Grid, Typography, Box, TextField, MenuItem, Button, FormControl, InputLabel, Select } from '@mui/material'
import PropTypes from 'prop-types';
import CrmTable from 'src/components/Table';
import AddIcon from '@mui/icons-material/ControlPoint';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { error, success } from 'src/hooks/Toasters';
import { updateEmployee } from 'src/apis/employees';


const theaders = [
    { label: "Skill", field: "name", type: "text" },
    { label: "Level", field: "level", type: "text" },
    { label: "Actions", editBtn: true, deleteBtn: true, field: "actions", type: "actions", },
]

const skillLevels = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
    { label: 'Expert', value: 'expert' },
]


const initSkillPayload = {
    name: '',
    level: ''
}

const Skills = (props) => {
    const { employee } = props;
    const [skillPayload, setSkillPayload] = useState(initSkillPayload);
    const [showAddSkillForm, setShowAddSkillForm] = useState(false);

    const handleFormItemChange = (name, value) => {
        setSkillPayload({
            ...skillPayload,
            [name]: value
        });
    }

    const openSkillForm = () => {
        setSkillPayload(initSkillPayload);
        setShowAddSkillForm(true);
    }

    const closeSkillFrom = () => {
        setSkillPayload(initSkillPayload);
        setShowAddSkillForm(false);
    }


    const checkSkillPayloadIsValidate = () => {
        if (skillPayload.name && skillPayload.level) {
            return true
        }
        return false
    }

    const addSkills = () => {
        if (checkSkillPayloadIsValidate()) {
            let skills = [
                skillPayload,
                ...employee.skills
            ];
            updateEmployee(employee.employeeSNO, { skills }).then(res => {
                if (res.status === 200) {
                    success(res.message);
                } else {
                    error(res.message);
                }
            })
        } else {
            error('Invalid Skill Payload')
        }
    }

    const onClickEditBtn = (event) => {
    }

    const onClickDeleteBtn = (event) => {
      
    }



    return (
        <Card>
            <CardContent>
                <Box mb={2} display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="h5" > Current Skills</Typography>
                    {showAddSkillForm ? (<Button variant="contained" color={'warning'} onClick={closeSkillFrom}
                        startIcon={<HighlightOffIcon />} className="text-white">Cancel </Button>) :
                        (<Button variant="contained" onClick={openSkillForm}
                            startIcon={<AddIcon />} className="text-white">Add New Skill </Button>)
                    }
                </Box>
                {showAddSkillForm && <Box mb={2}>
                    <Grid container spacing={3} >
                        <Grid item xs={5} >
                            <TextField type="text" id="skillname" label="Skill Name" variant="outlined" name="name" value={skillPayload.name}
                                onChange={(e) => { handleFormItemChange('name', e.target.value) }} size="small" fullWidth />
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="level">Skill Level</InputLabel>
                                <Select
                                    labelId="level"
                                    id="level"
                                    value={skillPayload.level}
                                    onChange={(e) => handleFormItemChange('level', e.target.value)}
                                    label={'Skill Level'}
                                >
                                    {skillLevels.map(opt =>
                                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" onClick={addSkills} fullWidth
                                startIcon={<AddIcon />} className="text-white"
                                disabled={!skillPayload?.name || !skillPayload?.level} >Submit </Button>
                        </Grid>
                    </Grid>
                </Box>
                }
                <Box>
                    <CrmTable theaders={theaders} tbody={employee?.skills || []}
                        onClickEditBtn={onClickEditBtn} onClickDeleteBtn={onClickDeleteBtn}
                        showPagination={false}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

Skills.propTypes = {
    employee: PropTypes.object,
};


export default Skills;