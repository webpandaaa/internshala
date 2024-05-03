const express = require("express");
const router = express.Router();
const { homepage , 
    currentUser,
    studentsignup,
    studentsignin,
    studentsignout,
    studentsendmail
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

// Get / student /Send-mail(forgot password)
router.post("/student/send-mail" , studentsendmail);






module.exports = router;