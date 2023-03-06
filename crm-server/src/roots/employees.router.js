const root = require('express').Router();
const employeeCtrl = require('../controls/employees.ctrl')

root.post('/createEmployee', employeeCtrl.createEmployee);
root.get('/getAll', employeeCtrl.getAllEmployees);
root.get('/getAllBDMEmployees', employeeCtrl.getAllBDMEmployees);
root.delete('/delete/:employeeSNO', employeeCtrl.deleteEmployee);
root.post("/updateEmployee/:employeeSNO", employeeCtrl.updateEmployee);
root.get('/get/:employeeSNO', employeeCtrl.getParticularEmployee);
root.post('/login', employeeCtrl.employeeLogin);
root.get('/getLoginData', employeeCtrl.getLoginData);
root.get('/logout', employeeCtrl.employeeLogout);
root.get('/auth', (req, res) => {
    ResponseService.success(res, "Welcome to dashboard!", {});
})


module.exports = root;
