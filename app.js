require("dotenv").config("./.env")
const express = require("express");
const app = express();

// const PORT = 8080;

//logger
const logger = require("morgan");
app.use(logger("tiny"));


//routes
app.use("/" , require("./routes/indexRoutes"));


// error handling

const ErrorHandler = require("./utils/ErrorHandler");
const {generatedErrors} = require("./middlewares/errors")
app.all("*" , (req,res,next) =>{
    next(new ErrorHandler(`request url not found ${req.url}` , 404));
});
app.use(generatedErrors);



app.listen(
    process.env.PORT , 
    console.log(`server runnig in port ${process.env.PORT}`
    ));
