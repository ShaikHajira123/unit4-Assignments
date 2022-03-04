const express=require("express")
const app=express()

app.use(allBooks);

app.get("/books",(req,res)=>{
    return res.send({route:"/books"})
})

function allBooks(req,res,next){
    console.log("Fetching all books")
    next()
}




app.use( singleBook);
  
app.get('/book/:name',(req,res)=>{
    req.name=req.params.name
   return  res.send({"bookName":req.name});

})
 function singleBook(req, res,next) {
     console.log("called")
    next()
}
  

app.listen(5000, () => {
  console.log("listening on port 5000");
});