const express=require("express")
const app=express()
const mongoose=require("mongoose")
app.use(express.json())

const connectDB = ()=>{
     return mongoose.connect("mongodb+srv://shaikHajira123:hajira123@cluster0.vcq9f.mongodb.net/assignment?retryWrites=true&w=majority")
}

const sectionSchema=new mongoose.Schema({
    sectionName:{type:String,required:true},
})
const Section = mongoose.model("section",sectionSchema)


const BooksSchema = new mongoose.Schema({
    name:{type:String,required:true},
    body:{type:String,require:true},
    sectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"section",
        required:true,
    }
})
const Books = mongoose.model("book",BooksSchema)


const userSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,require:true},
})
const User = mongoose.model("user",userSchema)


const authorSchema=new mongoose.Schema({
    // authorname:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
     }
    })
    const Author = mongoose.model("author",authorSchema)


    const bookAuthorSchema = new mongoose.Schema({
      
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"author",
        required:true,
    },
    booksId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true,
    }
})
const BookAuthor=mongoose.model("bookAuthor",bookAuthorSchema)


// const checkedOutSchema = new mongoose.Schema({
//       userId:{
//           type:mongoose.Schema.Types.ObjectId,
//           ref:"user",
//           required:true,
//       },
//       booksId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"book",
//         required:true,
//       },
//       checkedOutTime:null,
//       checkedInTime:null,
  
// },

// {    timestamps:true,
   
    
//  })
// const Checkout=mongoose.model("checkout",checkedOutSchema)


// app.post("/checkout",async(req,res)=>{
//     try{
//         const checkout=await Checkout.create(req.body)
//         return res.status(200).send(checkout)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
//  })

// app.get("/checkout/:id",async(req,res)=>{
//     try{
//         const author=await User.findById(req.params.id).lean().exec()
       
//         if(checkedOutTime!==null && checkedInTime===null){
//         return res.status(200).send("book not available")
//         }
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })


app.post("/bookAuthor",async(req,res)=>{
    try{
        const author=await BookAuthor.create(req.body)
        return res.status(200).send(author)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.get("/bookauthor",async(req,res)=>{
    try{
        const author=await BookAuthor.find()
        .populate({path:"booksId",select:{name:1,body:1,_id:0}})
        .populate({path:"authorId",select:{first_name:1,_id:0},
            populate:{path:"userId",select:{first_name:1}
        }})
        .lean().exec()
        return res.status(200).send(author)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})


app.post("/authors",async(req,res)=>{
    try{
        const author=await Author.create(req.body)
        return res.status(200).send(author)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.get("/authors",async(req,res)=>{
    try{
        const author=await Author.find()
        .populate({path:"userId",select:{first_name:1,_id:0}})
        .lean()
        .exec()
        return res.status(200).send(author)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})


app.post("/user",async(req,res)=>{
    try{
        const author=await User.create(req.body)
       
        .lean()
        .exec();
        return res.status(200).send(author)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})


app.get("/user",async(req,res)=>{
    try{
        const author=await User.find().lean().exec()
        return res.status(200).send(author)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.get("/user/:id",async(req,res)=>{
    try{
        const author=await User.findById(req.params.id).lean().exec()
        return res.status(200).send(author)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})


app.patch("/user/:id",async(req,res)=>{
    try{
        const auth=await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        }).lean().exec()
        return res.status(200).send(auth)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.delete("/user/:id",async(req,res)=>{
    try{
        const auth=await User.findByIdAndUpdate(req.params.id).lean().exec()
        return res.status(200).send(auth)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.post("/books",async(req,res)=>{
    try{
        const books = await Books.create(req.body)
        return res.status(200).send(books)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.get("/books",async(req,res)=>{
    try{
        const books = await Books.find().lean().exec()
        return res.status(200).send(books)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.get("/books/:id",async(req,res)=>{
    try{
        const books = await Books.findById(req.params.id).lean().exec()
        return res.status(200).send(books)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.patch("/books/:id",async(req,res)=>{
    try{
        const books = await Books.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        }).lean().exec()
        return res.status(200).send(books)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.delete("/books/:id",async(req,res)=>{
    try{
        const books = await Books.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send(books)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.get("/section",async(req,res)=>{
    try{
      const section = await Section.find().lean().exec();
      return res.status(200).send(section)
    }catch(err){
    return res.status(500).send({message:err.message})
    }
})

app.post("/section",async(req,res)=>{
    try{
      const section = await Section.create(req.body)
      return res.status(200).send(section)
    }catch(err){
    return res.status(500).send({message:err.message})
    }
})

app.get("/section/:id",async(req,res)=>{
    try{
      const section = await Section.findById(req.params.id).lean().exec()
      return res.status(200).send(section)
    }catch(err){
    return res.status(500).send({message:err.message})
    }
})

app.patch("/section/:id",async(req,res)=>{
    try{
        const section = await Section.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        }).lean().exec();
        return res.status(200).send(section)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})



app.delete("/section/:id",async(req,res)=>{
    try{
        const section = await Section.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(section)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.listen(5000,async ()=>{
    try{
       await connectDB()
    }catch(err){
        console.log("err")
    }
    console.log("connected to 3000 port")
})