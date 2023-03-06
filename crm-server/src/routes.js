const router = require('express').Router();
const utility = require('./roots/utility.router');
const userroutes = require('./roots/user.router');
const clientroutes =  require('./roots/clients.router');
const employeeroutes =require('./roots/employees.router');
const fileUploadroutes =require('./roots/file.upload');
const { isAuthenticated } = require('./services/AuthService');

 
router.use(isAuthenticated);
router.use('/statics', utility);
router.use('/user', userroutes);
router.use('/clients', clientroutes);
router.use('/employees', employeeroutes);
router.use('/file/clients',fileUploadroutes);



module.exports = router;