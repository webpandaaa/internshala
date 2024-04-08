const express = require("express");
const router = express.Router();
const { homepage } = require("../controllers/indexControllers")


router.get("/", (req,res,next) => {
    res.json({ message : "homepage" })
})




module.exports = router;