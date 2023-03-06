let mongoose = require('mongoose');
let validator = require('validator');
let schema = mongoose.Schema;

const empRoles = StaticService.crmStaticData.empRoles;

let employees = new schema({
    employeeSNO: {
        type: String,
        unique: true,
        trim: true
    },
    companyName: {
        type: String,
        required: [true, 'Company Name is required'],
        trim: true
    },
    employeeName: {
        type: String,
        required: [true, 'Employee Name is required'],
        trim: true
    },
    employeeCode: {
        type: String,
        required: [true, 'Employee code is required'],
        trim: true,
        unique: true
    },
    designation: {
        type: String,
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
    },
    officeLocation: {
        type: String,
        trim: true
    },
    workLocation: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid email address']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'employees' },
    role: {
        type: String,
        trim: true,
        enum: [
            empRoles.manager,
            empRoles.teamlead,
            empRoles.associate,
            empRoles.bdmTeamlead,
            empRoles.bdmAssociate,
        ]
    },
    countryCode: {
        type: String,
        trim: true
    },
    mobile: {
        type: String,
        trim: true
    },
    dob: {
        type: Date
    },
    gender: {
        type: String,
        trim: true,
        enum: StaticService.crmStaticData.genders
    },
    photoUrl: { type: String },
    maritalStatus: {
        type: String,
        trim: true
    },
    skills: [
        {
            name: {
                type: String,
                trim: true
            },
            level: {
                type: String,
                enum: StaticService.crmStaticData.skillLevels
            },
        }
    ],
    desiredSkills: [String],
    address: {
        type: String,
        trim: true
    },
    employeesList: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'employees' }
    ],
    createdDate: {
        type: Date,
        default: new Date(),
    }
})
module.exports = mongoose.model('employees', employees)