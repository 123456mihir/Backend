const express = require("express");
const mongoose= require("mongoose");
const server = express();

server.use(express.json())

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        default:"Ramesh",
        minlength:2,
        maxlength:20
    },

    age:{
        type:Number,
        default:null,
        min:18,
        max:25
    },

    email:{
        type:String,
        unique:true,
        required:true,
    },

    course:{
        type:String,
        default:"web",
        enum:["web","DM"]
    },
     status:{
        type:Boolean,
        default:true
     }
})

const student = mongoose.model("Students", studentSchema);


server.post("/student/create", async (req,res)=>{
   try{
    const exist=await student.findOne({email:req.body.email});
    if(exist){
        return res.send({
            message: "try with diffrent email",
            flag:0
        })
    }
  await student.create({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        course:req.body.course
   })

    res.status(201).send({
        message :"Student data is created",
        flag:1
    })

   } catch(error){
    console.log(error)
      res.send({
    message:"internal Server Error",
    flag:0
})
   }
})

server.get("/student", async(req,res)=>{
    try{
    const students = await student.find();
    res.send({
        message:"Data send",
        flag:1,
        students
    })
    console.log(students);

   } catch(error){
      res.send({
    message:"internal Server Error",
    flag:0
})
   }
})

server.delete("/student/remove/:id", async(req,res)=>{
    try {
       const id=req.params.id 
       const studentExist=await student.findById(id);
       if(!studentExist)(
        res.send({
        message:"Student data not found",
        flag:0
       })
    )

       await student.deleteOne({_id:id})
       res.send({
        message:"Data deleted successfully",
        flag:1
       })
    } catch(error){
      res.send({
    message:"internal Server Error",
    flag:0
      })
    }
})

server.patch("/student/update/:id",async (req,res)=>{
    try {
         const id= req.params.id
         const studentExist= await student.findById(id);

         if(!studentExist){
            res.send({
                message:"Student data not found",
                flag:0
            })
         }

         await student.updateOne(
            {_id:id},{

                $set:{
                   status:!studentExist.status
            }
         }
        )

        res.send({
            message:"Data updated successfully",
            flag:1
        })


        
    } catch(error){
      res.send({
    message:"internal Server Error",
    flag:0
      })
    }
})



mongoose.connect("mongodb://localhost:27017/Mihir").then(
    ()=>{
        console.log("Database connected")
        

server.listen(
        "5000",
        ()=>{
            console.log("Server is Started on port 5000");
        }
)
    }

).catch(
    ()=>{
        console.log("databse not connected");
    }
)