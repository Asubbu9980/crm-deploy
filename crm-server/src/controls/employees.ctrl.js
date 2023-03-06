const { errorHandler } = require('../services/ErrorHandler');


exports.createEmployee = async (req, res) => {
    try {
        const loginEmployee = req.session.data?.employee;

        const { serialNumber, session, opts } = await MongoIdGenerator({ model: "Employees", prefix: "EMP", sufix: "", startNumber: 1, increment: 1 });
        const employeeSNO = serialNumber;
        let reqbody = req.body;
        let password = reqbody.password && await CommonService.encriptPassword(reqbody.password)

        let query = {
            employeeSNO,
            companyName: reqbody.companyName,
            employeeName: reqbody.employeeName,
            employeeCode: reqbody.employeeCode,
            designation: reqbody.designation,
            department: reqbody.department,
            officeLocation: reqbody.officeLocation,
            workLocation: reqbody.workLocation,
            email: reqbody.email,
            password: password,
            manager: reqbody.reportingTo,
            role: reqbody.role,
            countryCode: reqbody.countryCode,
            mobile: reqbody.mobile,
            dob: reqbody.dob,
            gender: reqbody.gender,
            maritalStatus: reqbody.maritalStatus,
            skills: reqbody.skills,
            desiredSkills: reqbody.desiredSkills,
            address: reqbody.address,
            employeesList: reqbody.employeesList
        }
        try {
            const resp = await Employees(query).save(opts);
            if (resp) {
                let updateFindQuery = {
                    _id: reqbody.reportingTo
                }
                let setQuery = {
                    employeesList: resp._id
                };
                const updatedReportingResp = await Employees.findOneAndUpdate(updateFindQuery, { $addToSet: setQuery });
            }

            await session.commitTransaction();
            await session.endSession();
            ResponseService.success(res, "Employee Added successfully", resp);
        } catch (err) {
            await session.abortTransaction();
            await session.endSession();
            let errorMsg = await errorHandler(err);
            ResponseService.error(res, errorMsg, err);
        }
    } catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
}

exports.getAllEmployees = async (req, res) => {
    try {
        const resp = await Employees.find({})
            .populate("manager", ["employeeName", "employeeCode", "employeeSNO", "email", "role"])
            .populate("employeesList", ["employeeName", "employeeCode", "employeeSNO", "email", "role"]);

        ResponseService.success(res, "All Employees", resp);
    } catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
}

exports.getAllBDMEmployees = async (req, res) => {
    try {
        const resp = await Employees.find({ role: { $in: [StaticService.crmStaticData.empRoles.bdmTeamlead, StaticService.crmStaticData.empRoles.bdmAssociate] } })
            .populate("manager", ["employeeName", "employeeCode", "employeeSNO", "email", "role"])
            .populate("employeesList", ["employeeName", "employeeCode", "employeeSNO", "email", "role"]);

        ResponseService.success(res, "All BDM Employees", resp);
    } catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        let query = {
            employeeSNO: req.params.employeeSNO
        }
        const resp = await Employees.findOneAndDelete(query);
        if (resp) {
            ResponseService.success(res, "Employee Deleted Successfully", {});
        } else {
            ResponseService.error(res, "Employee Doesn't Exist", null);
        }
    } catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
}

exports.updateEmployee = async (req, res) => {
    try {
        let reqbody = req.body;

        let query = {
            employeeSNO: req.params.employeeSNO
        }

        let setQuery = {
            companyName: reqbody.companyName,
            employeeName: reqbody.employeeName,
            employeeCode: reqbody.employeeCode,
            email: reqbody.email,
            role: reqbody.role,
            designation: reqbody.designation,
            department: reqbody.department,
            officeLocation: reqbody.officeLocation,
            workLocation: reqbody.workLocation,
            manager: reqbody.reportingTo,
            countryCode: reqbody.countryCode,
            mobile: reqbody.mobile,
            dob: reqbody.dob,
            maritalStatus: reqbody.maritalStatus,
            gender: reqbody.gender,
            address: reqbody.address
            // skills : reqbody.skills,
            // desiredSkills: reqbody.desiredSkills,
            // address : reqbody.address,
            // employeesList : reqbody.employeesList ,
        };

        const resp = await Employees.findOneAndUpdate(query, { $set: setQuery });
        if (resp) {
            let updateFindQuery = {
                _id: reqbody.reportingTo
            }
            let setQuery = {
                employeesList: resp._id
            };
            const updatedReportingResp = await Employees.findOneAndUpdate(updateFindQuery, { $addToSet: setQuery });
        }
        if (resp) {
            ResponseService.success(res, "Employee updated Successfully", resp);
        } else {
            ResponseService.error(res, "Employee Doesn't Exist", null);
        }
    } catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
};

exports.getParticularEmployee = async (req, res) => {
    try {
        let query = {
            employeeSNO: req.params.employeeSNO
        }
        const resp = await Employees.findOne(query)
            .populate("manager", ["employeeName", "employeeCode", "employeeSNO", "email", "manager", "role"])
            .populate("employeesList", ["employeeName", "employeeCode", "employeeSNO", "email", "manager", "role"]);
        if (resp) {
            ResponseService.success(res, "Employee Available", resp);
        } else {
            ResponseService.error(res, "Employee Doesn't Exist", null);
        }
    } catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }

};

exports.employeeLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            ResponseService.error(res, "Email is required", null);
            return;
        }
        if (!password) {
            ResponseService.error(res, "Password is required", null);
            return;
        }

        const employee = await Employees.findOne({ email: email })
            .populate("manager", ["employeeName", "employeeCode", "employeeSNO", "email", "role"])
            .populate("employeesList", ["employeeName", "employeeCode", "employeeSNO", "email", "role"]);
        if (employee) {
            const verifyPassword = await CommonService.comparePassword(password, employee.password);
            if (!verifyPassword) {
                ResponseService.error(res, "Incorrect Password", null);
                return;
            }
            req.session.data = {};
            req.session.data.employee = employee;
            ResponseService.success(res, "Welcome to dashboard!", employee);
        }
        else {
            ResponseService.error(res, "Incorrect Email", "Incorrect Email")
        }

    }
    catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }

}


const getEmployeeDashboardRouts = (role) => {
    try {
        var roots = [];
        const analyticsPath = { title: 'Dashboard', path: '/dashboard/analytics', icon: '' };
        const employeesPath = { title: 'Employees', path: '/dashboard/employees', icon: '' };
        const clientsPath = { title: 'Clients', path: '/dashboard/clients', icon: '' };
        const bdmClientsPath = { title: 'Campaigns', path: '/dashboard/bdmclients', icon: '' };

        switch (role) {
            case StaticService.crmStaticData.empRoles.manager: {
                roots = [
                    analyticsPath,
                    employeesPath,
                    clientsPath
                ];
            }; break;
            case StaticService.crmStaticData.empRoles.teamlead: {
                roots = [
                    analyticsPath,
                    clientsPath
                ];
            }; break;
            case StaticService.crmStaticData.empRoles.associate: {
                roots = [
                    analyticsPath,
                    clientsPath
                ];
            }; break;
            case StaticService.crmStaticData.empRoles.bdmTeamlead: {
                roots = [
                    analyticsPath,
                    bdmClientsPath
                ];
            }; break;
            case StaticService.crmStaticData.empRoles.bdmAssociate: {
                roots = [
                    analyticsPath,
                    bdmClientsPath
                ];
            }; break;
        }
        return roots;
    }
    catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
}

exports.getLoginData = async (req, res) => {
    try {
        const sessionEmp = req.session.data.employee;
        const roots = await getEmployeeDashboardRouts(sessionEmp.role)
        let responsePayload = {
            ...sessionEmp,
            roots
        }
        ResponseService.success(res, "Login Details!", responsePayload);
    }
    catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
}

exports.employeeLogout = async (req, res) => {
    try {
        req.session.destroy();
        ResponseService.success(res, 'Employee Logged out!', {});
    } catch (err) {
        ResponseService.error(res, InfoMessageService.Messages.commonErrorMessage, err);
    }
}