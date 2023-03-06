const root = require('express').Router();
const clientCtrl = require('../controls/clients.ctrl')

root.post('/create', clientCtrl.createClient);
root.get('/getAll', clientCtrl.getAllClients);
root.get('/getBDMClients', clientCtrl.getBDMClients);
root.delete('/delete/:clientId', clientCtrl.deleteClient);
root.post("/update/:clientId", clientCtrl.updateClient);
root.post("/updateClientFromBDM/:clientId", clientCtrl.updateClientFromBDM);
root.get('/get/:clientId', clientCtrl.getParticularClient);
root.post('/assignToBDM', clientCtrl.clientsAssignToBDM);

module.exports = root;
























