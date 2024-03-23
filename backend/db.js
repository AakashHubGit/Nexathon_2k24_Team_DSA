require('dotenv').config()
const mongoose = require('mongoose');
const mongoURI=process.env.MONGO_URI


const connectToMongo=async()=>{
    mongoose.connect("mongodb+srv://teamprojects2902:startup@cluster0.wccp0eu.mongodb.net/")
    .then(()=>{console.log("Connected To Mongo")})
    .catch((err)=>{console.log(err)});
}

module.exports=connectToMongo;