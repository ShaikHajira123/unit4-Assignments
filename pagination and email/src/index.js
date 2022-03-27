const express = require("express")

const connect = require("./configs/db.js")

const userController = require("./controllers/user.controller")


const app = express()

app.use(express.json())

app.use("/user",userController)



app.listen(3000, async () => {
    try{
        await connect()
        console.log("listening at port 3000")
    }catch(err){
        console.log({message : err.message})
    }

})

