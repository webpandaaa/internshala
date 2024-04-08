require("dotenv").config("./.env")
const express = require("express");
const app = express();

// const PORT = 8080;

//logger
const logger = require("morgan");
app.use(logger("tiny"));


//routes
app.use("/" , require("./routes/indexRoutes"));





app.listen(
    process.env.PORT , 
    console.log(`server runnig in port ${process.env.PORT}`
    ));
