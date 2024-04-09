const express = require("express");
const router = express.Router();
const { homepage } = require("../controllers/indexControllers")


router.get("/", homepage)




module.exports = router;