
const express = require("express")

const router = express.Router();
const authenticate = require("../middlewares/authenticate")
const authorise = require("../middlewares/authorise")


const Product = require("../models/product.model")

router.post("", authenticate,authorise(["admin","seller"]), async (req, res) => {
    try{
        if(req.body.user_id ==req.user._id){
        const product = await Product.create(req.body)
        return res.status(200).send(product)
        }
        else{
            return res.status(400).send({message : "userId not matched with loggedIn user"})

        }
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }

})

router.get("", async (req, res) => {
    try{
        const product = await Product.find()
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

router.patch("/:id", authenticate, authorise(["admin","seller"]), async(req, res) => {
    try{
        
        const Product = await Product.findById(req.params.id).lean().exec();
        
        if(Product.user_id ==req.user._id){
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})
        return res.status(200).send(product)
        }
        else{
            return res.status(400).send({message : "userId not matched with loggedIn user"})

        }
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

router.delete("/:id", authenticate, authorise(["admin","seller"]), async(req, res) => {
    try{
        const Product = await Product.findById(req.params.id).lean().exec();
        if(Product.user_id ==req.user._id){
        const product = await Product.findByIdAndDelete(req.params.id)
        return res.status(200).send(product)
        }
        else{
            return res.status(400).send({message : "userId not matched with loggedIn user"})

        }
    }
    catch(err){
        return res.status(400).send({message : err.message})

    }
})

module.exports = router;