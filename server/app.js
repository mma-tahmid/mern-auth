
require("dotenv").config();

// 1. Basic LIB import
//const router = require("./src/routes/api");
const userApi = require("./src/routes/usersApi")


const express = require("express");

// object Creation of express

const app = new express();
const bodyParser = require("body-parser");


// 2. Security Middleware IMPORT (Security related packages) 

const rateLimit = require("express-rate-limit")
const helmet = require('helmet')
const mongoSanitize = require("express-mongo-sanitize")
const cors = require("cors")

// 3. DataBase Lib Import
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");



// 4. Security Middleware IMPLEMENT (Security related packages)

app.use(cors());

//app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(mongoSanitize())

app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }))


// 5. body parsar Implement    
app.use(bodyParser.json());



// 6. Request Rate Limiting

// const limiter = rateLimit({

//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)


// })

// app.use(limiter);


let OPTION = { autoIndex: true };



mongoose.connect(process.env.DATABASE_URI, OPTION)
    .then((res) => {
        console.log("MongoDB Connected Successfully")

    })

    .catch((error) => {
        console.log(error)

    })


// 9. Backend Routing Implement

//app.use("/api/v1", router) // base url api (api/v1)



const baseUrl = process.env.BASE_URL

app.use(`${baseUrl}/user-auth`, userApi); // .env ar kono kiso path ar modddhe set korte hore aivabe set korte hobe
// app.use(`${baseUrl}/category`, categorysApi);
// app.use(`${baseUrl}/products`, productssApi);



//undefined Route
app.use("*", (req, res) => {
    res.status(404).json({
        "status": "Fail",
        "data": "Not FOUND"
    })
})

module.exports = app; 