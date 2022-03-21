const express = require('express')
//const router=require("./controllers/user.controller")

 const userController = require("./controllers/user.controller")
// const bookController = require("./controllers/book.controller")
// const publicationController = require("./controllers/publication.controller")
const commentController = require("./controllers/comment.controller")
const {register,login} = require("./controllers/user.controller")

const app=express();
app.use(express.json())

app.use("/users",userController)
app.post("/register",register)
app.post("/login",login)
// app.use("/books",bookController)
// app.use("/publications",publicationController)
app.use("/comments",commentController)
const connect=require('./configs/db')

app.listen(4000,async ()=>{
    try{
        await connect()
        console.log("listening on port 4000")
   }catch(err){
       console.log({message:err.message})
   }
})
module.exports=app

//module.exports=app