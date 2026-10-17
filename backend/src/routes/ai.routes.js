const express = require("express");
const aiController = require("../controllers/ai.controller");
const router = express.Router();

// Yahan getReview ka 'R' capital hai, aur controller ka 'C' capital hai
router.post("/get-review", aiController.getReview);

module.exports = router;