import jwt from "jsonwebtoken"
import {User} from "../models/userModel.js"

export const authenticate = async (req, res, next) => {
    let token 
     token = req.cookies.jwt

     if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRATE)
            req.user = await User.findOne(decoded.userId).select("-password")
            next()
            
        } catch (error) {
            res.status(401).json({
                status:401,
                message:" Not Authorized token failed"
            })
        }
     }
}