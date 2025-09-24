import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})

export const uploadImage = async (imagePath) => {
    try {
        const upload  = await cloudinary.uploader.upload(imagePath, {
            resource_type:"auto"
        })
        console.log("file upload successfully")
        return upload
        fs.unlinkSync(imagePath) 
    } catch (error) {
        fs.unlinkSync(imagePath)
    }
}