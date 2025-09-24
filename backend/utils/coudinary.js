import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})

const uploadImage = async (imagePath) => {
    try {
        const upload  = await cloudinary.uploader.upload(image, {
            resource_type:"auto"
        })
        console.log("file upload successfully")
        fs.unlinkSync(imagePath) 
    } catch (error) {
        fs.unlinkSync(imagePath)
    }
}