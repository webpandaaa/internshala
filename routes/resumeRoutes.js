const express = require("express");
const router  = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { resume } = require("../controllers/resumeControllers");


//Get/
router.get("/" , isAuthenticated ,resume);

module.exports = router;