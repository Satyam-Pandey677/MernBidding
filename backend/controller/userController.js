import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import bcript from "bcrypt"
import createToken from "../utils/createToken.js"

const register =async  (req, res) => {
    try {
        const {username, email, password,  role} = req.body;
        console.log(password)

        if(!username || !email || !password || !role){
            throw new Error("All details required");
        }

        const existed = await User.findOne({
            $or:[{username},{email}]
        })

        if(existed){
            throw new Error ("User Already Registered");
        }

        const salt = await bcript.genSalt(10)
        const hashedPass = await bcript.hash(password, salt);
        const newUser  = await User.create({
            username,
            email,
            password:hashedPass,
            role
        })

        if(!newUser) {
            throw new Error("Something goes off")
        }

        return res.status(201)
        .json(newUser);
    } catch (error) {
        throw new Error(error.message)
    }
}

const login  =async (req,res) => {
    const {username , email, password} = req.body;
    if(!username || !email ||!password){
        throw new Error ("All field are required")
    }

    const existeduser  = await User.findOne({
        $or:[{username}, {email}]
    })

    if(existeduser){
        const isPasswordMatched = await bcript.compare(password, existeduser.password)

        if(isPasswordMatched){
            createToken(res, existeduser._id)
        }

        res.status(200)
        .json(existeduser);

    }

    if(existeduser){

    }
}

export {
    register,
    login
}