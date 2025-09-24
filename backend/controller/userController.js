import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import genrateToken from "../utils/createToken.js"

const register =async  (req, res) => {
    try {
        const {username, email, password,  role} = req.body;

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

    // const existeduser  = await User.findOne({
    //     $or:[{username}, {email}]
    // })

    const query = email? {email} : {username};
    const existeduser = await User.findOne(query)


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

const getCurrentuser = async (req, res) => {
    try {
        res.status(200)
        .json({
            "message":"successfully get Current user",
            "user": req.user
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const {username, phoneNo} = req.body
    
        if(!username && !phoneNo){
            throw new Error("fields are required")
        }
    
        const updateUser = await User.findByIdAndUpdate(req.user._id, {
            username,
            phoneNo
        }) 
    
        if(!updateUser){
            throw new Error("Somthing went off")
        }
        return res.status(200)
        .json({
            updateUser,
            "message": "Profile updated successfully",
        })

    } catch (error) {
        res.status(500).json({"error":"Somthing Went Off"})
    }
}

const getUserbyId = async (req,res) => {
    try {
        const {id} = req.params;

        if(!id){
            throw new Error("User not found")
        }

        const user = await User.findById(id).select("-password")
        if(!user){
            throw new Error("User not found")
        }

        return res.status(200)
        .json({
            "message":"user fetched successfully",
            "data":user
        })
        
    } catch (error) {
        res.status(500)
        .json({
            "message": "Somthing Went off",
            "error": error.message
        })
    }
}

export {
    register,
    login,
    logout,
    getCurrentuser,
    updateUser,
    getUserbyId
}