const express=require("express")
const app=express()
const mongoose=require("mongoose")
app.use(express.json())

const connectDB = ()=>{
     return mongoose.connect("mongodb://localhost:27017/assignment")
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

const BooksecSchema = new mongoose.Schema({
    booksId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true,
    },
    sectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"section",
        required:true,
    },
})
const Booksec = mongoose.model("booksec",BooksecSchema)



const userSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,require:false},
})
const User = mongoose.model("user",userSchema)


const authorSchema=new mongoose.Schema({
    // authorname:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
     },
   
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


const checkedOutSchema = new mongoose.Schema({
      userId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"user",
          required:true,
      },
      booksId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true,
      },
      checkedOutTime:{type:Date,required:true,default:null},
      checkedInTime:{type:Date,required:false,default:null}
   
},

{  
      versionKey:false,
      timestamps:true,
   
 })
const Checkout=mongoose.model("checkout",checkedOutSchema)


app.post("/checkout",async(req,res)=>{
    try{
        const checkout=await Checkout.create(req.body)
        return res.status(200).send(checkout)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
 })

app.get("/checkout",async(req,res)=>{
    try{
        const check=await Checkout.find().lean().exec()
       return res.status(200).send(check)
       }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.post("/bookauthor",async(req,res)=>{
    try{
        const author=await BookAuthor.create(req.body)
        return res.status(200).send(author)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

// app.get("/bookauthor",async(req,res)=>{
//     try{
//         const author=await BookAuthor.find()
//         .populate({path:"booksId",select:{name:1,body:1,_id:0}})
//         .populate({path:"authorId",select:{_id:1},
//     populate:{path:"userId",select:{first_name:1,_id:0}}
//         })
//         .lean().exec()
//         return res.status(200).send(author)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })


// app.post("/authors",async(req,res)=>{
//     try{
//         const author=await Author.create(req.body)
//         return res.status(200).send(author)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })

// app.get("/authors",async(req,res)=>{
//     try{
//         const author=await Author.find()
//         .populate({path:"userId",select:{first_name:1,_id:0}})
//         .lean()
//         .exec()
//         return res.status(200).send(author)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })


// app.post("/user",async(req,res)=>{
//     try{
//         const author=await User.create(req.body)
       
//         // .lean()
//         // .exec();
//         return res.status(200).send(author)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })


// app.get("/user",async(req,res)=>{
//     try{
//         const author=await User.find().lean().exec()
//         return res.status(200).send(author)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })

// app.get("/user/:id",async(req,res)=>{
//     try{
//         const author=await User.findById(req.params.id).lean().exec()
//         return res.status(200).send(author)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })


// app.patch("/user/:id",async(req,res)=>{
//     try{
//         const auth=await User.findByIdAndUpdate(req.params.id,req.body,{
//             new:true,
//         }).lean().exec()
//         return res.status(200).send(auth)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })

// app.delete("/user/:id",async(req,res)=>{
//     try{
//         const auth=await User.findByIdAndUpdate(req.params.id).lean().exec()
//         return res.status(200).send(auth)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })

app.post("/book",async(req,res)=>{
    try{
        const books = await Books.create(req.body)
        return res.status(200).send(books)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})
app.post("/booksec",async(req,res)=>{
    try{
        const books = await Booksec.create(req.body)
        return res.status(200).send(books)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})
app.get("/booksec/:id", async (req, res) => {
    try {
        const books= await Booksec.findById(req.params.id).lean().exec();

        return res.status(200).send({books: books});
    } 
    catch (err)
     {
        return res.status(500).send({message:err.message});
    }
});


app.get("/book",async(req,res)=>{
    try{
        const books = await Books.find().lean().exec()
        return res.status(200).send(books)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.get("/book/:id",async(req,res)=>{
    try{
        var books = await BookAuthor.findById(req.params.id)
        .populate({
      path:"booksId",
      select:["name"]
        })
        .populate({
            path:"authorId",
            select:["_id"],
            populate:{path:"userId",select:["first_name"]},
              }).lean().exec()
        return res.status(200).send(books)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

// app.patch("/book/:id",async(req,res)=>{
//     try{
//         const books = await Books.findByIdAndUpdate(req.params.id,req.body,{
//             new:true,
//         }).lean().exec()
//         return res.status(200).send(books)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })

// app.delete("/book/:id",async(req,res)=>{
//     try{
//         const books = await Books.findByIdAndDelete(req.params.id).lean().exec()
//         return res.status(200).send(books)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })

// app.get("/section",async(req,res)=>{
//     try{
//       const section = await Section.find().lean().exec();
//       return res.status(200).send(section)
//     }catch(err){
//     return res.status(500).send({message:err.message})
//     }
// })

// app.post("/section",async(req,res)=>{
//     try{
//       const section = await Section.create(req.body)
//       return res.status(200).send(section)
//     }catch(err){
//     return res.status(500).send({message:err.message})
//     }
// })

// app.get("/section/:id",async(req,res)=>{
//     try{
//       const section = await Section.findById(req.params.id).lean().exec()
//       return res.status(200).send(section)
//     }catch(err){
//     return res.status(500).send({message:err.message})
//     }
// })

// app.patch("/section/:id",async(req,res)=>{
//     try{
//         const section = await Section.findByIdAndUpdate(req.params.id,req.body,{
//             new:true
//         }).lean().exec();
//         return res.status(200).send(section)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })



// app.delete("/section/:id",async(req,res)=>{
//     try{
//         const section = await Section.findByIdAndDelete(req.params.id).lean().exec();
//         return res.status(200).send(section)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })

app.listen(5000,async ()=>{
    try{
       await connectDB()
       console.log("connected to 3000 port")
    }catch(err){
        console.log({message:err.message})
    }
   
})