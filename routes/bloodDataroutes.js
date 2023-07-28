const express = require('express');
const authmiddlewars = require('../middlewares/authmiddlewars');
const getBloodData = require('../controllers/bloodDatacontroller');
const router = express.Router();

router.get('/blood-data', authmiddlewars, getBloodData)

module.exports = router;