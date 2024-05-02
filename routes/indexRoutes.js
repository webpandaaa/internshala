const express = require("express");
const router = express.Router();
const { homepage , 
    currentUser,
    studentsignup,
    studentsignin,
    studentsignout
     } = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");

//get
router.get("/", homepage)

//Post  /student 
router.post("/student", isAuthenticated, currentUser)

// Post / student /SignUp
router.post("/student/signup" , studentsignup);

// Post / student /Signin
router.post("/student/signin" , studentsignin);

// Get / student /Signout
router.get("/student/signout" ,isAuthenticated, studentsignout);




module.exports = router;