import { Product } from "../models/productModel.js";
import {uploadImage} from "../utils/coudinary.js"

const createProduct = async (req, res) =>{
    const {name, discription,  pickUp, drop} = req.body;

    if(!name || !discription){
        throw new Error("Somthing went off")
    }

    console.log(JSON.parse(pickUp))

    const imagePath = req.files.image[0].path
    const imageUrl = await uploadImage(imagePath)

    const product = await Product.create({
        name,
        discription,
        image:imageUrl.url,
        pickUp:JSON.parse(pickUp),
        drop :JSON.parse(drop),
        createdBy:req.user?._id,
        bidders:[]
    })

    return res.status(201)
    .json({
        "message":"product created Successfully",
        data:product
    })
    
} 


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()

        if(!products) {
            throw new Error("No products available")
        }

        return res.status(200)
        .json({
            "message":"All product fetched",
            "data ": products
        }) 
    } catch (error) {
        
    }
}

const getProductById = async (req, res) => {
    try {
        const {id} = req.params;

        console.log(id)

        if(!id) {
            throw new Error("id is required")
        }

        const product = await Product.findById(id)
        console.log(product)

        if(!product){
            throw new Error("Something went off")
        }
        return res.status(200)
        .json({
            "message": "Fetched product by id",
            "data":product
        })
    } catch (error) {
        res.status(500)
        .json(error)
    }
}

export {
    createProduct,
    getProductById,
    getAllProducts
}