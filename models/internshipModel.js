const mongoose = require("mongoose");


const internshipModel = new mongoose.Schema(
    {
        profile: String,
        skill: String, 
        internshiptype : {type : String , enum :["in Office", "Remote"]},
        openings : Number,
        from : String,
        to : String,
        duration : String,
        responsibility : String,
        stipend : {
            status : {
                type : String , 
                enum :["Fixed", "Negotiable" , "performance" , "based" , "Unpaid "],
            },
            amount: Number,
        },
        perkes : String,
        assesments : String, 
       
    },
    {timestamps : true});

const Internship =mongoose.model("internship" , internshipModel);

module.exports = Internship;