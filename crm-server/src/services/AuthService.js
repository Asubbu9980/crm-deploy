const { noAuthRequired, donloadLink } = require('./Config');  

module.exports = {
    isAuthenticated: async (req, res, next) => {
        try {
            if (noAuthRequired.find(x => x === req.url)) {
                next();
            }
            else if (req.url.includes(donloadLink[0])) {
                next();
            }
            else {
                if (req.session.data && req.session.data.employee && req.session.data.employee.employeeCode) {
                    next();
                } else {
                    ResponseService.unauthorized(res, InfoMessageService.Messages.unauthorizedRequest, InfoMessageService.Messages.unauthorizedRequest)
                }
            }
        } catch (err) {
            ResponseService.error(res, err.message, err.message)
        }
    }

}
