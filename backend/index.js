import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
const port = 4000;

app.use(express.json())
app.use(cookieParser())
DbConnect();


import { DbConnect } from "./config/db.js";

DbConnect()

import userRoute from "./routes/userRoute.js"


app.use("/api/user", userRoute);

app.listen(4000, () => {
    console.log("server running at port ", port)
})