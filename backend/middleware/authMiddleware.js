import jwt from "jsonwebtoken"
import {User} from "../models/userModel.js"

export const authenticate = async (req, res, next) => {
    let token 
     token = req.cookies.jwt
    
     if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRATE)
            req.user = await User.findById(decoded.userId).select("-password")
            next()
            
        } catch (error) {
            res.status(401).json({
                status:401,
                message:" Not Authorized token failed"
            })
        }
     }
}

export const authAsSeller = async(req, res, next) => {
    if(req.user?.isAdmin || req.user?.role == "sender"){
        next()
    }else{
        return res.status(400).
        json({
            "message": "User not Admin or Seller"
        })
    }
}