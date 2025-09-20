import jwt from "jsonwebtoken"

const genrateToken = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRATE,{
        expiresIn:"30d"
    })

    if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Not authorized, no token",
    })
  }

    res.cookie('jwt', token, {
        httpOnly:true,
        secure:process.env.NODE_ENV !== "development",
        sameSite :"strict",
        maxAge:30*24*60*60*1000
    })

    return token
}

export default genrateToken