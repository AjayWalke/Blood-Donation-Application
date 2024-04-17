const express = require('express');
const authmiddlewars = require('../middlewares/authmiddlewars');
const { getAdminDonar, getAdminHospital, getAdminOrganisation } = require('../controllers/admincontroller');
const router = express.Router();

router.get('/get-Donar', authmiddlewars, getAdminDonar)

router.get('/get-hospital', authmiddlewars, getAdminHospital)

router.get('/get-organisation', authmiddlewars, getAdminOrganisation)

module.exports = router;