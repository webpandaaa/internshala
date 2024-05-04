const { catchAsyncErrors } = require("../middlewares/catchAsync");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/Sendtoken");


exports.homepage =  catchAsyncErrors(async (req,res,next) => {
    res.json({ message : " Secure homepage!" });
});

exports.currentUser =  catchAsyncErrors(async (req,res,next) => {
    const student = await Student.findById(req.id).exec();
    res.json({student})
});

exports.studentsignup = catchAsyncErrors(async (req,res,next) => {
    const student = await new Student(req.body).save();
    sendtoken(student, 201, res);
});

exports.studentsignin = catchAsyncErrors(async (req,res,next) => {
    const student = await Student.findOne({email : req.body.email})
    .select("+password")
    .exec();

    if(!student) 
        return next(
            new ErrorHandler("User not found with this email address" , 404)
        );

    const isMatch = student.comparepassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("Wrong Credentials" , 500));

    sendtoken(student, 200, res);
});

exports.studentsignout = catchAsyncErrors(async (req,res,next) => {
    res.clearCookie("token");
    res.json({ message : "Successfully Signout"});
});

exports.studentsendmail = catchAsyncErrors(async (req,res,next) => {
    const student = await Student.findOne({email : req.body.email}).exec();
    if(!student) 
        return next(
            new ErrorHandler("User not found with this email address" , 404)
        );

    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;

    sendmail(req,res,next,url);

    
    res.json({student, url});
});








