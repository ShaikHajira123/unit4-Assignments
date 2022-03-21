const mongoose=require('mongoose')
const bookSchema=new mongoose.Schema({
   like:{type:String,required:true},
    coverImage:{type:String,required:true},
    content:{type:String,required:true},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }
},
{
    versionKey:false,
    timestamps:true,
})
module.exports=mongoose.model("book",bookSchema)