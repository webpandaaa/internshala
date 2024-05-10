const express = require("express");
const router  = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { resume ,
    addeducation,
    editeducation, 
    deleteeducation,
} = require("../controllers/resumeControllers");


//Get/
router.get("/" , isAuthenticated ,resume);


// Post / add-education
router.post("/add-edu" , isAuthenticated , addeducation)

// Post / edit education
router.post("/edit-edu/:eduid" , isAuthenticated , editeducation)

// Post / delete education
router.post("/delete-edu/:eduid" , isAuthenticated , deleteeducation)

module.exports = router;