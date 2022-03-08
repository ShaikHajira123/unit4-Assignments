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



//var singleBook=express.Router()
app.use( singleBook);
app.get('/book/:name',(req,res)=>{
    req.name=req.params.name
    res.send({"bookName":req.name});
    

})
 function singleBook(req, res,next) {
    console.log(1)
    next()
}
  

app.listen(5000, () => {
  console.log("listening on port 5000");
});