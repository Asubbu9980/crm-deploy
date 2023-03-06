const { errorHandler } = require('../services/ErrorHandler');

exports.createClient = async (req, res) => {
    try {
        const { serialNumber, session, opts } = await MongoIdGenerator({ model: "Clients", prefix: "CLI", sufix: "", startNumber: 1, increment: 1 });
        const clientId = serialNumber;
        let reqbody = req.body;
        const employee = req.session.data.employee;

        let query = {
            clientId,
            createdBy: employee._id,
            companyName: reqbody.companyName,
            jobTitle: reqbody.jobTitle,
            firstName: reqbody.firstName,
            lastName: reqbody.lastName,
            designation: reqbody.designation,
            email: reqbody.email,
            mobile: reqbody.mobile,
            location: reqbody.location,
            jobLink: reqbody.jobLink,
            companyURL: reqbody.companyURL,
            personURL: reqbody.personURL,
            status: reqbody.status,
            comments: reqbody.comments
        }

        try {
            const resp = await Clients(query).save(opts);
            await session.commitTransaction();
            session.endSession();
            ResponseService.success(res, "Client Added successfully", resp);
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            let errorMsg = await errorHandler(err);
            ResponseService.error(res, errorMsg, err);
        }
    } catch (err) {
        let errorMsg = await errorHandler(err);
        ResponseService.error(res, errorMsg, err);
    }
}

exports.getAllClients = async (req, res) => {
    try {
        let reqQuery = req.query;
        const sessionEmployee = req.session.data.employee;
        const leadOrTeamList_ids = sessionEmployee.employeesList && sessionEmployee.employeesList.map((emp) => emp._id);
        let query = {};

        let createdByEmployees = {}
        if (sessionEmployee.role === StaticService.crmStaticData.empRoles.manager) {
            const employeeList = await Employees.find({ "manager": { $in: leadOrTeamList_ids } }, { _id: 1 });
            let employee_ids = employeeList.map((emp) => emp._id);
            const totalEmployeeCodes = [...employee_ids, ...leadOrTeamList_ids, sessionEmployee._id];
            createdByEmployees = { $in: totalEmployeeCodes };
        } else if (sessionEmployee.role === StaticService.crmStaticData.empRoles.teamlead) {
            const leadAndTeamcodes = [sessionEmployee._id, ...leadOrTeamList_ids]
            createdByEmployees = { $in: leadAndTeamcodes };
        } else {
            createdByEmployees = { $in: [sessionEmployee._id] }
        }

        // let initQuery = {
        //     '$or': [
        //         {
        //             "createdBy": createdByEmployees,
        //         },
        //         {
        //             "assignedTo": sessionEmployee._id
        //         },
        //     ]
        // };

        // query['$and'] = [initQuery];

        query = {
            "createdBy": createdByEmployees
        }

        // let populateMatchSearchQuery = {};
        if (reqQuery.search) {
            const availableFields = ['clientId', 'createdBy.employeeCode', 'companyName', 'jobTitle', 'firstName', 'lastName', 'designation', 'email', 'mobile', 'location', 'jobLink', 'companyURL']
            const fieldsWithQuery = availableFields.map(field => {
                let fieldSearchObj = {};
                fieldSearchObj[field] = { $regex: reqQuery.search, $options: "i" }
                return fieldSearchObj;
            })
            // let searchQuery = {
            //     '$or': fieldsWithQuery
            // };
            // query['$and'] = [initQuery, searchQuery]

            query['$or'] = fieldsWithQuery

            // let populateMatchFields = ['employeeSNO', 'employeeName', 'employeeCode', 'email', 'role'];
            // let populateMatchFieldsQuery = populateMatchFields.map(field => {
            //     let fieldSearchObj = {};
            //     fieldSearchObj[field] = { $regex: reqQuery.search, $options: "i" }
            //     return fieldSearchObj
            // })
            // populateMatchSearchQuery = {
            //     '$or': populateMatchFieldsQuery
            // };
        }


        if (reqQuery.status && reqQuery.status != 'all') {
            reqQuery.status == 'assigned' ? query['assignedTo'] = { $exists: true } : null;
            reqQuery.status == 'positive-response' ? query['status'] = StaticService.crmStaticData.clientStatus[1] : null;
            reqQuery.status == 'no-response' ? query['status'] = StaticService.crmStaticData.clientStatus[2] : null;
            reqQuery.status == 'dnd' ? query['status'] = StaticService.crmStaticData.clientStatus[3] : null;
        }

        const skip = req.query.skip || 0;
        const limit = req.query.limit || 500;
        const count = await Clients.count(query);
        const resp = await Clients.find(query)
            .populate("createdBy", ["employeeName", "employeeCode", "employeeSNO", "email", "role"])
            .populate("assignedBy", ["employeeName", "employeeCode", "employeeSNO", "email", "role"])
            .populate("assignedTo", ["employeeName", "employeeCode", "employeeSNO", "email", "role"])
            .skip(skip).limit(limit);


        // const resp = await Clients.aggregate([
        //     {
        //         $lookup: { from: 'employees', localField: 'createdBy', foreignField: '_id', as: 'createdBy' },
        //     },
        //     {
        //         $lookup: { from: 'employees', localField: 'assignedBy', foreignField: '_id', as: 'assignedBy' },
        //     },
        //     {
        //         $lookup: { from: 'employees', localField: 'assignedTo', foreignField: '_id', as: 'assignedTo' }
        //     },
        //     {
        //         $match: {
        //             $or:[
        //                 {
        //                     "assignedTo.employeeCode": { $regex: "MLI1", $options: "i" }
        //             },
        //             {
        //                 'createdBy.employeeCode': "MLI1026"
        //             }
        //         ]

        //         }
        //         // $match: {
        //         //     "assignedTo.employeeCode": { $regex: "MLI1", $options: "i" }
        //         // }
        //         // $match: {
        //         //     'createdBy.employeeCode': "MLI1026"
        //         // }
        //     },
        //     // { $unwind: "$createdBy" },
        //     // { $unwind: "$assignedBy" },
        //     // { $unwind: "$assignedTo" },
        // ]);


        ResponseService.success(res, "All Clients", {
            totalCount: count,
            clients: resp
        });
    } catch (err) {
        console.log(err)
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
}



exports.getBDMClients = async (req, res) => {
    try {
        let reqQuery = req.query;
        const sessionEmployee = req.session.data.employee;
        const leadOrTeamList_ids = sessionEmployee.employeesList && sessionEmployee.employeesList.map((emp) => emp._id);
        let query = {};

        let createdByEmployees = {}
        if (sessionEmployee.role === StaticService.crmStaticData.empRoles.manager) {
            const employeeList = await Employees.find({ "manager": { $in: leadOrTeamList_ids } }, { _id: 1 });
            let employee_ids = employeeList.map((emp) => emp._id);
            const totalEmployeeCodes = [...employee_ids, ...leadOrTeamList_ids, sessionEmployee._id];
            createdByEmployees = { $in: totalEmployeeCodes };
        } else if (sessionEmployee.role === StaticService.crmStaticData.empRoles.teamlead) {
            const leadAndTeamcodes = [sessionEmployee._id, ...leadOrTeamList_ids]
            createdByEmployees = { $in: leadAndTeamcodes };
        } else {
            createdByEmployees = { $in: [sessionEmployee._id] }
        }

        let initQuery = {
            '$or': [
                {
                    "assignedTo": createdByEmployees
                },
            ]
        };

        query['$and'] = [initQuery];


        if (reqQuery.search) {
            const availableFields = ['clientId', 'companyName', 'jobTitle', 'firstName', 'lastName', 'designation', 'email', 'mobile', 'location', 'jobLink', 'companyURL']
            const fieldsWithQuery = availableFields.map(field => {
                let fieldSearchObj = {};
                fieldSearchObj[field] = { $regex: reqQuery.search, $options: "i" }
                return fieldSearchObj;
            })
            let searchQuery = {
                '$or': fieldsWithQuery
            };

            query['$and'] = [initQuery, searchQuery]
        }

        if (reqQuery.status && reqQuery.status != 'all') {
            reqQuery.status == 'positive-response' ? query['status'] = StaticService.crmStaticData.clientStatus[1] : null;
            reqQuery.status == 'no-response' ? query['status'] = StaticService.crmStaticData.clientStatus[2] : null;
            reqQuery.status == 'dnd' ? query['status'] = StaticService.crmStaticData.clientStatus[3] : null;
            reqQuery.status == 'sent' ? query['status'] = StaticService.crmStaticData.clientStatus[4] : null;
            reqQuery.status == 'opended' ? query['status'] = StaticService.crmStaticData.clientStatus[5] : null;
            reqQuery.status == 'clicked' ? query['status'] = StaticService.crmStaticData.clientStatus[6] : null;
            reqQuery.status == 'failed' ? query['status'] = StaticService.crmStaticData.clientStatus[7] : null;
        }

        const skip = req.query.skip || 0;
        const limit = req.query.limit || 500;
        const count = await Clients.count(query);
        const resp = await Clients.find(query)
            .populate("assignedBy", ["employeeName", "employeeCode", "employeeSNO", "email", "role"])
            .populate("assignedTo", ["employeeName", "employeeCode", "employeeSNO", "email", "role"])
            .skip(skip).limit(limit);

        ResponseService.success(res, "All BDM Clients", {
            totalCount: count,
            clients: resp
        });
    } catch (err) {
        console.log(err)
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
}


exports.deleteClient = async (req, res) => {
    try {
        let query = {
            clientId: req.params.clientId
        }
        const resp = await Clients.findOneAndDelete(query);
        if (resp) {
            ResponseService.success(res, "Client Deleted Successfully", {});
        } else {
            ResponseService.error(res, "Client Doesn't Exist", null);
        }
    } catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
}

exports.updateClient = async (req, res) => {
    try {
        let reqbody = req.body;
        let query = {
            clientId: req.params.clientId
        }

        let setQuery = {
            companyName: reqbody.companyName,
            jobTitle: reqbody.jobTitle,
            firstName: reqbody.firstName,
            lastName: reqbody.lastName,
            email: reqbody.email,
            mobile: reqbody.mobile,
            designation: reqbody.designation,
            location: reqbody.location,
            status: reqbody.status,
            jobLink: reqbody.jobLink,
            companyURL: reqbody.companyURL,
            comments: reqbody.comments
        };

        const resp = await Clients.findOneAndUpdate(query, { $set: setQuery });
        if (resp) {
            ResponseService.success(res, "Client updated Successfully", resp);
        } else {
            ResponseService.error(res, "Client Doesn't Exist", null);
        }
    } catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
};



exports.updateClientFromBDM = async (req, res) => {
    try {
        let reqbody = req.body;
        let query = {
            clientId: req.params.clientId
        }

        let setQuery = {
            comments: reqbody.comments
        };

        const resp = await Clients.findOneAndUpdate(query, { $set: setQuery });
        if (resp) {
            ResponseService.success(res, "Client updated Successfully", resp);
        } else {
            ResponseService.error(res, "Client Doesn't Exist", null);
        }
    } catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
};


exports.getParticularClient = async (req, res) => {
    try {
        let query = {
            clientId: req.params.clientId
        }
        const resp = await Clients.findOne(query)
            .populate("createdBy", ["employeeName", "employeeCode", "employeeSNO", "email", "role"])
            .populate("assignedBy", ["employeeName", "employeeCode", "employeeSNO", "email", "role"])
            .populate("assignedTo", ["employeeName", "employeeCode", "employeeSNO", "email", "role"]);
        if (resp) {
            ResponseService.success(res, "Client Available", resp);
        } else {
            ResponseService.error(res, "Client Doesn't Exist", null);
        }
    } catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }

};


exports.clientsAssignToBDM = async (req, res) => {
    try {
        let reqbody = req.body;
        const sessionEmployee = req.session.data.employee;
        let query = {};

        if (reqbody.selectAll) {
            const leadOrTeamList_ids = sessionEmployee.employeesList && sessionEmployee.employeesList.map((emp) => emp._id);
            let createdByEmployees = {}
            if (sessionEmployee.role === StaticService.crmStaticData.empRoles.manager) {
                const employeeList = await Employees.find({ "manager": { $in: leadOrTeamList_ids } }, { _id: 1 });
                let employee_ids = employeeList.map((emp) => emp._id);
                const totalEmployeeCodes = [...employee_ids, ...leadOrTeamList_ids, sessionEmployee._id];
                createdByEmployees = { $in: totalEmployeeCodes };
            } else if (sessionEmployee.role === StaticService.crmStaticData.empRoles.teamlead) {
                const leadAndTeamcodes = [sessionEmployee._id, ...leadOrTeamList_ids]
                createdByEmployees = { $in: leadAndTeamcodes };
            } else {
                createdByEmployees = { $in: [sessionEmployee._id] }
            }

            // let initQuery = {
            //     '$or': [
            //         {
            //             "createdBy": createdByEmployees,
            //         },
            //         {
            //             "assignedTo": sessionEmployee._id
            //         },
            //     ]
            // };

            // query['$and'] = [initQuery];

            query = {
                "createdBy": createdByEmployees
            }

            if (reqbody.search) {
                const availableFields = ['clientId', 'companyName', 'jobTitle', 'firstName', 'lastName', 'designation', 'email', 'mobile', 'location', 'jobLink', 'companyURL']
                const fieldsWithQuery = availableFields.map(field => {
                    let fieldSearchObj = {};
                    fieldSearchObj[field] = { $regex: reqbody.search, $options: "i" }
                    return fieldSearchObj
                })
                // let searchQuery = {
                //     '$or': fieldsWithQuery
                // };

                // query['$and'] = [initQuery, searchQuery]

                query['$or'] = fieldsWithQuery
            }


            if (reqbody.status && reqbody.status != 'all') {
                reqbody.status == 'assigned' ? query['assignedTo'] = { $exists: true } : null;
                reqbody.status == 'positive-response' ? query['status'] = StaticService.crmStaticData.clientStatus[1] : null;
                reqbody.status == 'no-response' ? query['status'] = StaticService.crmStaticData.clientStatus[2] : null;
                reqbody.status == 'dnd' ? query['status'] = StaticService.crmStaticData.clientStatus[3] : null;
            }

        } else {
            query = {
                clientId: { $in: reqbody.clientIds }
            }
        }

        let setQuery = {
            assignedBy: sessionEmployee._id,
            assignedTo: reqbody.assignedTo
        }

        const resp = await Clients.updateMany(query, { $set: setQuery });
        if (resp) {
            ResponseService.success(res, "Clients assigned successfully", resp);
        } else {
            ResponseService.error(res, "Clients failed to assign", null);
        }
    } catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }

};




