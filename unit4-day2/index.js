const express=require("express")
const add=express()
add.get("/home",function(req,res){
    return res.send("hello")
})

add.get("/books",(req,res)=>{
   let books={ firstBook:"english",
                secondBook:"Maths",
                thirdBook:"Physics",
                fourthBook:"science"}
      return res.send(books)
})

add.listen(2000,()=>{
    console.log("haj")
})