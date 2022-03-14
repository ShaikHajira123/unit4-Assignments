const express = require("express");
const mongoose = require("mongoose")

const app = express();

// Connect MongoDB

const connectDB = () => {
    //mongodb url
 return mongoose.connect("mongodb://localhost:27017/assignment")
}



// create Schema - basically a structure of our document
const userSchema = mongoose.Schema({
    id : {type :Number, required: false},
    // first_name : String,
    // last_name : String,
    // email : String,
    // gender : String,
    // password : String,
    // ip_address : String,
    movie_name:{type:String},
    production_year:{type:Number},
    budget:{type:Number},
    ip_address:{type:String},
   
})

// Model

// users - user
const User = mongoose.model("movies", userSchema)
//  db.user


app.get("/movies", async (req,res) => {
    const userData = await User.find().limit(10).lean().exec();
    console.log(userData)
    return res.send(userData)
})




app.listen(4000,async() => {
    try{
        await connectDB();
        console.log("listening at 4321")
    }
    catch(e){
        console.log(e)
    }
       
})