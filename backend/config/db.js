import mongoose from "mongoose"

export const DbConnect = async() => {
    try {
        const db = await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
        if(db) {
            console.log("Database Connected SuccessFully");
        }
    } catch (error) {   
        throw new Error(error.message)
    }
}

