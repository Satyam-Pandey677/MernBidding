import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique: true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }, 
    role:{
        type:String,
        enum:["sender","transporter"],
        required:true
    }
},{
    timestamps:true
})

export const User = mongoose.model("User", userSchema);