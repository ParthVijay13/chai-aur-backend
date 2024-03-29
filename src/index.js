//require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({path:'./env'})
connectDB()
.then(()=>{
    application.listen(process.env.PORT||8000,()=>{
        console.log(`Server is listening on ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed: ", err);
})


/*
;(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",()=>{
            console.log("ERROR:",error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.log("ERROR:",error);
    }
})()
*/