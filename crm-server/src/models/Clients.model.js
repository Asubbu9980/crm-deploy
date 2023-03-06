let mongoose = require("mongoose");
let validator = require('validator');
let schema = mongoose.Schema;

let clients = new schema({
    clientId: {
        type: String,
        unique: true,
        trim: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'employees'},
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'employees'},
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'employees'},
    companyName: {
        type: String,
        required: [true, 'Company Name is required'],
        trim: true
    },
    jobTitle: {
        type: String,
        required: [true, 'Job Title is required'],
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    designation: {
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
    mobile: {
        type: String,
    },
    location: {
        type: String,
        trim: true,
    },
    jobLink: {
        type: String,
        trim: true,
    },
    companyURL: {
        type: String,
        trim: true,
    },
    personURL: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        trim: true,
        enum: StaticService.crmStaticData.clientStatus,
        default: 'N/A'
    },
    comments: {
        type: String,
    },
    createdDate: { type: Date, default: new Date() },
    isActive: { type: String, default: true }

});

module.exports = mongoose.model("clients", clients);
