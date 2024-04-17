const express = require('express');
const authmiddlewars = require('../middlewares/authmiddlewars');
const {createinvencontroller, getinvencontroller, getDonar, getHospital, getOrganization} = require('../controllers/inventorycontroller');
const router = express.Router();

// create inventory
router.post('/create-inventory', authmiddlewars, createinvencontroller);


// get the inventory
router.get('/get-inventory', authmiddlewars, getinvencontroller);


// get donar
router.get('/get-donar', authmiddlewars, getDonar)


// get hospitals
router.get('/get-hospital', authmiddlewars, getHospital)


// get the organization
router.get('/get-organization', authmiddlewars, getOrganization)

module.exports = router;