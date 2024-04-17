const express = require('express');
const { registerController, logincontroller, middlewarecontroller } = require('../controllers/authcontroller');
const authmiddlewars = require('../middlewares/authmiddlewars');
const router = express.Router();

// register route
router.post('/register', registerController);

// login route
router.post('/login', logincontroller)

// get the user
router.get('/current-user', authmiddlewars, middlewarecontroller);

module.exports = router;