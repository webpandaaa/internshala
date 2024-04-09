exports.generatedErrors = (err, req, res, next) =>{
    const statusCode = err.statusCode || 505;

    res.status(statusCode).json({
        message:err.message,
        errname: err.name,
        // stack: err.stack
    });
};