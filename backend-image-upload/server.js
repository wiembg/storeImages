const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

require('dotenv').config();


const students = require("./routes/students");

const app = express();

if (process.env.NODE_ENV != "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(fileUpload());
app.use(express.static("uploads"));
app.use("/api/students", students);




mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("connected to db"))
.catch(err=>console.log(err))

app.listen(process.env.PORT,()=>console.log(`Server running on port ${process.env.PORT}`));

