const express = require("express");
const router = express.Router();
const { homepage , 
    currentUser,
    studentsignup,
    studentsignin,
    studentsignout,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar,
    applyinternship,
    applyjob,
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

// Post / student /Send-mail(forgot password)
router.post("/student/send-mail" , studentsendmail);

// Get / student /forget-link/:student_id
router.get("/student/forget-link/:id" , studentforgetlink);

// Post / student /reset-password/:student_id
router.post("/student/reset-password/:id" , isAuthenticated , studentresetpassword );

// Post / student /update/:id
router.post("/student/update/:id" , isAuthenticated , studentupdate );

// Post / student /avatar/:id
router.post("/student/avatar/:id" , isAuthenticated , studentavatar );


// ------------------------- apply internship -------------------------//

// Post/student/apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid" , isAuthenticated , applyinternship );

// ------------------------- apply job --------------------------------//

// Post /student/apply/job/:jobid
router.post("/student/apply/job/:jobid" , isAuthenticated , applyjob );




module.exports = router;