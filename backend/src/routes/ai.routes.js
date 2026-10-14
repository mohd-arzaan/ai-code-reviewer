const express = require("express");
const aicontroller = require("../controllers/ai.controller");
const router = express.Router();

router.get("/get-response" , aicontroller.getResponse);

module.exports = router;
