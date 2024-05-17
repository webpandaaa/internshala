const express = require("express");
const router = express.Router();
const { homepage , 
    currentUser,
    employesignup,
    employesignin,
    employesignout,
    employesendmail, 
    employeforgetlink,
    employeresetpassword,
    employeupdate,
    employeavatar,
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob,
    
    
     } = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");

//get
router.get("/", homepage)

// //Post  /employe / currentUser
router.post("/currentEmploye", isAuthenticated, currentUser)

// Post / employe /SignUp
router.post("/signup" , employesignup);

// Post / employe /Signin
router.post("/signin" , employesignin);

// Get / employe /Signout
router.get("/signout" ,isAuthenticated, employesignout);

// Post / employe /Send-mail(forgot password)
router.post("/send-mail" , employesendmail);

// Get / employe /forget-link/:employe_id
router.get("/forget-link/:id" , employeforgetlink);

// Post /reset-password/:employe_id
router.post("/reset-password/:id" , isAuthenticated , employeresetpassword );

// Post / employe /update/:id
router.post("/update/:id" , isAuthenticated , employeupdate );

// Post / employe /avatar/:id
router.post("/avatar/:id" , isAuthenticated , employeavatar );


// -------------------------------- InternShip -------------------------------//
// Post / employe /internship/create
router.post("/internship/create" , isAuthenticated , createinternship );

// Post / employe /internship/read
router.post("/internship/read" , isAuthenticated , readinternship );

// Post / employe /internship/read/:id
router.post("/internship/read/:id" , isAuthenticated , readsingleinternship );


// -------------------------------- Job -------------------------------//
// Post / employe /job/create
router.post("/job/create" , isAuthenticated , createjob );

// Post / employe /job/read
router.post("/job/read" , isAuthenticated , readjob );

// Post / employe /job/read/:id
router.post("/job/read/:id" , isAuthenticated , readsinglejob );





module.exports = router;