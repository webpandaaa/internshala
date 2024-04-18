const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentModel = new mongoose.Schema(
    {
        email: {
            type : String,
            unique: true,
            required: [true, "Email is required"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
            password:{
                type:String,
                select:false,
                maxLength:[15, "password should not exceed more than 15 characeters"],
                minLength:[6, "password should have at least 6 characeters"],

            }

},{timestamps : true});

studentModel.pre("save" , function(){

    if(!this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

const Student =mongoose.model("student" , studentModel);

module.exports = Student;

