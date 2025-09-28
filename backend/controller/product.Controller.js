import { io } from "../index.js";
import { Product } from "../models/productModel.js";
import {uploadImage} from "../utils/coudinary.js"

import {Server} from "socket.io"

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

const startAuction = async (req, res) => {
    const {id} = req.params

    const product = await Product.findById(id)
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.status = "open"
    await product.save()

    io.to("id").emit("actionStarted", {id})

    res.status(200).json({ message: "Auction started", product });
    
}

const bidStart = async(req, res) => {
    const {id} = req.params;
    const {amount} = req.body;

    if(!id) throw new Error("product id required");
    if(!amount) throw new Error("Aount is required");

    const product = await Product.findById(id);

    if(!product.status == "open") {
        res.send("Bidding no start at");
    }

    product.bidders.push({"transporter":req.user._id, });

    if(product.bidPrice >0 && amount >= product.bidPrice){
        res.status(400).status({"message": "your Bid is Higher then current bid"})
    }

    product.bidders.push({"transporter": req.user._id})

    product.bidPrice = amount;
    await product.save()

    io.to(id).emit("bidUpdate",product)

    res.status(200).json({"message": "bid placed", product})
}

export {
    createProduct,
    getProductById,
    getAllProducts,
    bidStart,
    startAuction
}