const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const connectdb = require("./config/db");
const path = require('path');
const authmiddlewars = require("./middlewares/authmiddlewars");
// const path = require('path');
dotenv.config({path: './utils/.env'});
const app = new express();
// database connection
connectdb();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // dev console

// routes
// app.get("/", (req, res)=>{
    //     res.status(200).json({
        //         message: "App is running",
        //     });
        // })
        

// routes
const port = process.env.PORT || 8080;
app.use("/api/v1/test", require("./routes/testroutes")); // checking the routes
app.use("/api/v1/auth", require("./routes/authroutes")); // register login logout funtion
app.use("/api/v1/inventory", require("./routes/inventoryroutes")); // checking and storing the records
app.use("/api/v1/blood", require('./routes/bloodDataroutes')); // returning the available and analysis of blood 
app.use("/api/v1/admin", require('./routes/adminroutes'))

// folder adding (static folder) (configuration of build)
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

app.listen(port, ()=>{
    console.log(`${process.env.PORT}`);
    console.log(`server is running ${process.env.PORT} in mode ${process.env.DEV_MODE}`.bgBlue.white);
});
