

const express=require("express")
const app=express()

app.use(logger)

app.get("/books",logger,logger,logger,(req,res)=>{
    return res.send({route:"/books",role:req.role})
 })
//   app.use(checkPermission)
app.get("/libraries",checkPermission("librarian"),(req,res)=>{
    return res.send({route:"/libraries",permission:true})
})
app.get("/authors",checkPermission("author"),(req,res)=>{
    return res.send({route:"/authors",permission:true})
})
function checkPermission(role){
    return function checkPermission(req,res,next){
        if(role==="author"){
      return next()
        }else if(role==="librarian"){
            return next()
        }
    return res.send({notallowed})
    }}

function logger(req,res,next){
    if(req.path==="/books"){
        req.role="books"
    }else if(req.path==="/libraries"){
        req.role="libraries"
    }else{
        req.role="authors"
    }
    console.log("called")
    next()
}

app.listen(4000,()=>{
    console.log("listening on port 4000")
})
