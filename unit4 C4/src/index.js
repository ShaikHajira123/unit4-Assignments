const express = require("express")
const connect = require("./configs/db")

const userController = require("./controllers/user.controller")
 const todoController = require("./controllers/todo.controller")
const {register , login} = require("./controllers/auth.controller")

const app = express()

app.use(express.json())


 app.use("/user",userController)

app.use("/todos",todoController)

app.post("/register",register)

app.post("/login",login)


app.listen(3000 ,async () => {
    try{
    await connect()
    console.log("listening on port 3000")
    }catch(err){
        console.log({message : err.message})
    }
})