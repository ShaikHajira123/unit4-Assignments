const express = require("express")

const router = express.Router()

const authenticate = require("../middlewares/authenticate")

const Todos = require("../models/todo.model")

router.post("",authenticate, async (req,res) => {
    try{
        const Todo = await Todos.create(req.body)
        return res.status(200).send(Todo)
    }catch(err){
        return res.status(400).send({message : err.message})
    }
})


router.get("", async (req,res) => {
    try{
        const Todo = await Todos.find().lean().exec()
        return res.status(200).send(Todo)
    }catch(err){
        return res.status(400).send({message : err.message})
    }
})

router.get("/:id",async (req,res) => {
    try{
        const Todo = await Todos.findById(req.params.id).lean().exec()
        return res.status(200).send(Todo)
    }catch(err){
        return res.status(401).send({message : err.message})
    }
})

router.patch("/:id",async (req,res) => {
    try{
        const Todo = await Todos.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        }).lean().exec()
        return res.status(200).send(Todo)
    }catch(err){
        return res.status(401).send({message : err.message})
    }
})

router.delete("/:id",async (req,res) => {
    try{
        const Todo = await Todos.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send(Todo)
    }catch(err){
        return res.status(401).send({message : err.message})
    }
})

module.exports = router