const { catchAsyncErrors } = require("../middlewares/catchAsync");





exports.homepage =  catchAsyncErrors(async (req,res,next) => {
    res.json({ message : "homepage" });
});