import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import genrateToken from "../utils/createToken.js"

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

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt);
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

const login = async (req,res) => {
    const {username , email, password} = req.body;
    if(!username && !email ||!password){
        throw new Error ("All field are required")
    }

    const existeduser  = await User.findOne({
        $or:[{username}, {email}]
    })
    console.log(existeduser)

    if(existeduser){
        const isPasswordMatched = await bcrypt.compare(password, existeduser.password)

        if(isPasswordMatched){
            genrateToken(res, existeduser._id)
        }

        res.status(200)
        .json({
            "user": existeduser,
            "message":"User Successfully login"
        });

    }else{
        throw new Error("Not user found");
    }
}

const logout = async (req, res) =>{
    res.cookie("jwt", " ", {
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200)
    .json({
        "message":"User Logout Successfully",
        "user ":req.user
    })
}

export {
    register,
    login,
    logout
}