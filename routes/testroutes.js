const { testcontrollers } = require("../controllers/testcontrollers");
const express = new require("express");
const router = express.Router();
router.get("/", testcontrollers);
module.exports = router;