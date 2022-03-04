const express=require("express")
const app=express()
app.get("/home",function(req,res){
    return res.send("hello")
})

app.get("/books",(req,res)=>{
   let books={ firstBook:"english",
                secondBook:"Maths",
                thirdBook:"Physics",
                fourthBook:"science"}
      return res.send(books)
})

app.listen(2000,()=>{
    console.log("haj")
})