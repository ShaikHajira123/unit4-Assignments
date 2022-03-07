
// const express=require("express")
// const app=express()
// app.get("/home",function(req,res){
//     return res.send("hello")
// })

// app.get("/books",(req,res)=>{
//    let books={ firstBook:"english",
//                 secondBook:"Maths",
//                 thirdBook:"Physics",
//                 fourthBook:"science"}
//       return res.send(books)
// })
// app.listen(2000,(req,res)=>{
//     console.log("listening on port 2000")
// })

const express=require("express")
const app=express()

app.use(logger)

app.get("/books",(req,res)=>{
    return res.send({route:"/books",role:req.role})
 })

app.get("/libraries",logger,checkPermission("librarian"),(req,res)=>{
    return res.send({route:"/libraries",permission:req.name})
})
app.get("/authors",logger,checkPermission("author"),(req,res)=>{
    return res.send({route:"/authors",permission:req.name})
})
function checkPermission(role){
    return function logger(req,res,next){
        if(role==="author" || role==="librarian"){
            req.name=true
      return next()
       
        }
        }
    }

function logger(req,res,next){
   console.log(req.path)
   return next()
}

app.listen(4000,()=>{
    console.log("listening on port 4000")
})
