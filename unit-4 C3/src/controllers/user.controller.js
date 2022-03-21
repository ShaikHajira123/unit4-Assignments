const express=require('express')
const User=require("../models/user.model")
const router=express.Router()
const generateToken=(user)=>{
    return jwt.sign(user,"secretkey") 
}
const register=async(req,res)=>{
    try{
        let user=await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).send({message:"Email already exists"})
        }
        user=await User.create(req.body)
        const token =generateToken(user)
        return res.status(200).send({user,token})
    }catch(err){
        res.status(400).send({message:err.message})
    }

}
const login=async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).send("wrong email or password")
        }
        const token =generateToken(user)
        return res.status(200).send({user,token})
    
    }catch(err){
        res.status(400).send({message:err.message})
    }
}
module.exports={register,login}