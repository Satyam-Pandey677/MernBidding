import express from "express"
import cors from "cors"

const app = express();
const port = 4000;

app.use(express.json())
DbConnect();


import { DbConnect } from "./config/db.js";

DbConnect()

import userRoute from "./routes/userRoute.js"

app.use("/api/user", userRoute),

app.listen(4000, () => {
    console.log("server running at port ", port)
})