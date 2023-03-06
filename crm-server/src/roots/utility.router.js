const root = require('express').Router();

root.get('/get', (req, res) => {
    try {
        ResponseService.success(res, '', StaticService.crmStaticData)
    } catch (err) {
        ResponseService.error(res, '', err)
    }
});


module.exports = root;