const mongoose = require("mongoose");
const { default: mongoose } = require("mongoose");

const studentModel = new mongoose.Schema(
    {
        email: {
            type : String,
            unique: true,
            required: [True, "Email is required"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
            password:{
                type:String,
                select:false,
                maxLength:[15, "password should not exceed more than 15 characeters"],
                minLength:[6, "password should have at least 6 characeters"],

            }

},{timestamps : true});


const Student =mongoose.model("student" , studentModel);

module.exports = Student;

