const { catchAsyncErrors } = require("../middlewares/catchAsync");
const Student = require("../models/studentModel");


exports.homepage =  catchAsyncErrors(async (req,res,next) => {
    res.json({ message : "homepage" });
});


exports.studentsignup = catchAsyncErrors(async (req,res,next) => {
    const student = await new Student(req.body).save();
    res.status(201).json(student);
});

exports.studentsignin = catchAsyncErrors(async (req,res,next) => {
    const student = await Student.findOne({email : req.body.email})
    .select("+password")
    .exec();
    res.json(student);
});

exports.studentsignout = catchAsyncErrors(async (req,res,next) => {});
