const express=require('express')
const router=express.Router()
const Comment=require("../models/comment.model")
// const app=require("./index")
router.post("",async(req,res)=>{
    try{
    const comment=await Comment.create(req.body)
    return res.status(200).send(comment)
    }catch(err){
        return res.status(400).send({message:err.message})
    }
})
module.exports=router