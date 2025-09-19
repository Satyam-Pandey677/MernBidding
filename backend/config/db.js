import mongoose from "mongoose"

export const connect = async() => {
    try {
        const db = await mongoose.connect();
        if(db) {
            console.log("Database Connected SuccessFully");
        }
    } catch (error) {   
        throw new Error(error.message)
    }
}

