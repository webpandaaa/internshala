const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema(
    {
        firstname: {
            type : String,
            required : [true, "First Name is required"],
            minLength: [4, "First name should be atleast 4 Character long"],
        },

        lastname: {
            type : String,
            required : [true, "last Name is required"],
            minLength: [4, "last name should be atleast 4 Character long"],
        },

        contact: {
            type : String,
            required : [true, "Contact is required"],
            maxLength: [10, "Contact must not exceed  10 Character"],
            minLength: [10, "Contact should be atleast 10 Character long"],
        },

        city: {
            type : String,
            required : [true, "City is required"],
            minLength: [3, "City should be atleast 3 Character long"],
        },

        gender: {type : String , enum:["Male" , "Female" , "Others"]},
        
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
        },

        resetPasswordToken: {
            type : String,
            default : "0"
        },

        avatar: {
            type : Object,
            default :{
                fileId: '',
                url : "https://images.unsplash.com/photo-1715089033372-f1c4856beef9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
        },
    },
    {timestamps : true});

    studentModel.pre("save" , function(){

    if(!this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});


studentModel.methods.comparepassword = function (password){
    return bcrypt.compareSync(password , this.password);
}

//token;
studentModel.methods.getjwttoken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const Student =mongoose.model("student" , studentModel);

module.exports = Student;

