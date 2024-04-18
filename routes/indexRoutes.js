const express = require("express");
const router = express.Router();
const { homepage , 
    studentsignup,
    studentsignin,
    studentsignout
     } = require("../controllers/indexControllers")

//get
router.get("/", homepage)



// Post / student /SignUp
router.post("/student/signup" , studentsignup);

// Post / student /Signin
router.post("/student/signin" , studentsignin);

// Get / student /Signout
router.get("/student/signout" , studentsignout);




module.exports = router;