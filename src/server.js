import express from "express"
import authorsRouter from "./services/authors/index.js"
import cors from "cors"

const server = express()

const port = 3001

server.use(cors())
server.use(express.json())
server.use("/authors", authorsRouter)
server.listen(port, () => {
    console.log("server listen runs on port " + port)
})