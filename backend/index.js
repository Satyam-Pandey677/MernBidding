import express from "express"
import http from "http"
import cors from "cors"
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

const app = express();
const port = 4000;

app.use(express.json())
app.use(cookieParser())
DbConnect();

const server = http.createServer(app);

export const io = new Server(server, {
    cors:{origin:""}
})

io.on("connect", (socket) => {
    console.log("Client Connected",socket.id)

    socket.on("joinRoom", ({id}) =>{
        socket.join(id)
    })

    socket.on("disconnect", () => {
        console.log("Client Disconnected")
    })

})


import { DbConnect } from "./config/db.js";

DbConnect()

import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRouter.js"
import { authAsSeller, authenticate } from "./middleware/authMiddleware.js";


app.use("/api/user", userRoute);
app.use("/api/product",authenticate,authAsSeller,productRoute)

server.listen(4000, () => {
    console.log("server running at port ", port)
})