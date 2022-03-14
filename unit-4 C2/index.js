const express=require("express")
const app=express()
const mongoose=require("mongoose")
app.use(express.json())

const connect = ()=>{
    return mongoose.connect("mongodb://localhost:27017/assignment")

}


const userSchema = new mongoose.Schema({
firstName: {type:String,required:true},
lastName : {type:String,required:true},
age : {type:String,required:true},
email: {type:String,required:true},
address: {type:String,required:true,},
gender : {type:String,required:true},
},
{
    versionKey:false,
    timestamps:true,
},
)
const User = mongoose.model("user",userSchema)


const branchdetailSchema = new mongoose.Schema({
    name: {type:String,required:true},
    address:{type:String,required:true},
    IFSC : {type:String,required:true},
    MICR : {type:Number,required:true},
   
    },
    {
        versionKey:false,
        timestamps:true,
    },
    )
    const BranchDetail = mongoose.model("branchdetail",branchdetailSchema)


    const masteraccountSchema = new mongoose.Schema({
     balance: {type:String,required:true},
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    branchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"branchdetail",
        required:true,
    },

},
        {
            versionKey:false,
            timestamps:true,
        },
        )
        const MasterAccount = mongoose.model("masteraccount",masteraccountSchema)

        const savingsaccountSchema = new mongoose.Schema({
            accountNumber: {type:String,required:true},
            balance :{type:String,required:true},
            interestRate : {type:String,required:true},
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
        masterId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"masteraccounts",
            required:true,
        },
    },
            {
                versionKey:false,
                timestamps:true,
            },
            )
            const SavingsAccount = mongoose.model("savingsaccount",savingsaccountSchema)


            const allaccountSchema = new mongoose.Schema({
                masterId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"masteraccount",
                    required:true,
                },
               savingsId:{
               type:mongoose.Schema.Types.ObjectId,
                   ref:"savingsaccount",
                   required:true,
               },
               fixedId:{
                   type:mongoose.Schema.Types.ObjectId,
                       ref:"fixedaccount",
                       required:true,
                   },
           },
                   {
                       versionKey:false,
                       timestamps:true,
                   },
                   )
                   const AllAccount = mongoose.model("allaccount",allaccountSchema)
    
  const fixedaccountSchema = new mongoose.Schema({
    accountNumber: {type:String,required:true},
    balance :{type:String,required:true},
    interestRate: {type:String,required:true},
    startDate : {type:String,required:true},
    maturityDate: {type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    masterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"masteraccount",
        required:true,
    },

    },
    {
        versionKey:false,
        timestamps:true,
    },
    )
    const FixedAccount = mongoose.model("fixedaccount",fixedaccountSchema)


    app.post("/users",async(req,res)=>{
        try{
            const user = await User.create(req.body)
            return res.status(200).send(user)
        }catch(err){
            return res.status(500).send({message:err.message})
        }
    })


    app.post("/masteraccount",async(req,res)=>{
        try{
            const master = await MasterAccount.create(req.body)
            return res.status(200).send(master)
        }catch(err){
            return res.status(500).send({message:err.message})
        }
    })


    
    app.get("/masteraccount",async(req,res)=>{
        try{
            const master = await MasterAccount.find()
            .populate({
               path:"userId",

            })
            .lean().exec()
            return res.status(200).send(master)
        }catch(err){
            return res.status(500).send({message:err.message})
        }
    })


    
    app.post("/savingsaccount",async(req,res)=>{
        try{
            const savings = await SavingsAccount.create(req.body)
            return res.status(200).send(savings)
        }catch(err){
            return res.status(500).send({message:err.message})
        }
    })

    app.post("/fixedaccount",async(req,res)=>{
        try{
            const savings = await FixedAccount.create(req.body)
            return res.status(200).send(savings)
        }catch(err){
            return res.status(500).send({message:err.message})
        }
    })


     
    app.get("/allaccount/:id",async(req,res)=>{
        try{
            const master = await AllAccount.findById(req.params.id)
            .populate({
               path:"savingsId",
               select:{accountNumber:1,balance:1,_id:0},
                   
            })
            .populate({
                path:"fixedId",
                select:{accountNumber:1,balance:1,_id:0},

            })
            .lean().exec()
            return res.status(200).send(master)
        }catch(err){
            return res.status(500).send({message:err.message})
        }
    })


app.listen(3000,async()=>{
    try{
        await connect()
        console.log("listening on port 4000")
    }catch(err){
        console.log(err)
    }
   
})