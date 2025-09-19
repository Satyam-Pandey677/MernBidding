import express from "express"

const app = express();
const port = 4000;


app.listen(4000, () => {
    console.log("server running at port ", port)
})