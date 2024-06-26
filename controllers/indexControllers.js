const { catchAsyncErrors } = require("../middlewares/catchAsync");
const Student = require("../models/studentModel");
const internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/Sendtoken");
const { sendmail } = require("../utils/nodemailer")
const path = require("path");
const Internship = require("../models/internshipModel");
const imagekit = require("../utils/imagekit").initImageKit()


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
    
    sendmail(req, res, next, url);
    student.resetPasswordToken = "1";
    await student.save();
    res.json({student, url});
});

exports.studentforgetlink = catchAsyncErrors(async (req,res,next) => {
    const student = await Student.findById(req.params.id).exec();
    
    if(!student) 
        return next(
            new ErrorHandler("User not found with this email address" , 404)
    );


    if( student.resetPasswordToken == "1"){
        student.resetPasswordToken = "0";
        student.password = req.body.password;
        await student.save();
    } 
    else{
        return next(
            new ErrorHandler(
                "Invalid Password Link! Please try again",500 
            )
        )
    }

    res.status(200).json({
        message: "password has been successfully changed"
    });
});

exports.studentresetpassword = catchAsyncErrors(async (req,res,next) => {
    const student  = await Student.findById(req.id).exec();
    student.password = req.body.password;
    await student.save();  
    sendtoken(student,201,res);
});

exports.studentupdate = catchAsyncErrors(async (req,res,next) => {
    await Student.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "Student updated Successfullly!",
    })
});

exports.studentavatar = catchAsyncErrors(async (req,res,next) => {
    const student = await Student.findById(req.params.id).exec();
    const file = req.files.avatar;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;


    if(student.avatar.fileId !== ""){
        await imagekit.deleteFile(student.avatar.fileId);
    }
    
    const {fileId,url} = await imagekit.upload({
        file: file.data,
        fileName : modifiedFileName,
    });

    student.avatar = {fileId,url};
    await student.save();

    res.status(200).json({
        success: true,
        message: "Profile Updated!",
    })
});

// ------------------------- apply internship -------------------------//


exports.applyinternship =  catchAsyncErrors(async (req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const internship = await Internship.findById(req.params.internshipid).exec();

    student.internships.push(internship._id);
    internship.students.push(student._id); 
    await student.save();
    await internship.save();
    
    res.json({student})
});



exports.applyjob =  catchAsyncErrors(async (req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const job = await Job.findById(req.params.jobid).exec();

    student.jobs.push(job._id);
    job.students.push(student._id); 

    await student.save();
    await job.save();

    res.json({student , job})
});









