import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    image:{
        type:String,
        require:true,
    },
    description:{
        type:String,
    },
    bidPrice:{
        type:Number,
        default : 0
    },

    pickUp:{
        address:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            require:true,
        },
        postalCode:{
            type:Number,
            required:true
        }
    },

    drop:{
         address:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            require:true,
        },
        postalCode:{
            type:Number,
            required:true
        }
    },
    bidders:[
        {
            transporter:{
                type:mongoose.Schema.ObjectId,
                ref:"User"
            },
        }
    ],
    bidWinner: {
        transporter:{
            type:mongoose.Schema.ObjectId,
                ref:"User"
        },
        bidAmount:{
            type:Number,
        }
    },
    status:{
        type:String,
        enum:["startSoon", "open", "complete"],
        default:"startSoon"
    },


},
{
    timestamps:true
})


export const Product = mongoose.model("Product",productSchema)