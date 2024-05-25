import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:Number,  
        require:true
    }, 
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    bookings:{
        type:[String]
    }
})

export default mongoose.model("User",userSchema)