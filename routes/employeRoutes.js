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
    
    
     } = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");

//get
router.get("/", homepage)

// //Post  /employe / currentUser
router.post("/currentEmploye", isAuthenticated, currentUser)

// Post / employe /SignUp
router.post("/signup" , employesignup);

// // Post / employe /Signin
router.post("/signin" , employesignin);

// // Get / employe /Signout
router.get("/signout" ,isAuthenticated, employesignout);

// // Post / employe /Send-mail(forgot password)
router.post("/send-mail" , employesendmail);

// // Get / employe /forget-link/:employe_id
router.get("/forget-link/:id" , employeforgetlink);

// // Post /reset-password/:employe_id
router.post("/reset-password/:id" , isAuthenticated , employeresetpassword );

// // Post / employe /update/:id
router.post("/update/:id" , isAuthenticated , employeupdate );

// // Post / employe /avatar/:id
router.post("/avatar/:id" , isAuthenticated , employeavatar );


// -------------------------------- InternShip -------------------------------//
// // Post / employe /internship/create
router.post("/internship/create" , isAuthenticated , createinternship );



module.exports = router;