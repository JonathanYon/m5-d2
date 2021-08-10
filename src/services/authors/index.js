import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs"



const authorsRouter = express.Router()

const filePath = fileURLToPath(import.meta.url)
const dirPath = dirname(filePath)
const jsonPath = join(dirPath, "authors.json")

authorsRouter.get("/", (req, res) => {
    const data = fs.readFileSync(jsonPath)
    res.send(JSON.parse(data))
})

authorsRouter.get("/:authorId", (req, res) => {
    const authors = JSON.parse(fs.readFileSync(jsonPath))
    const author = authors.find(s => s.id === req.params.authorId)
})

authorsRouter.post("/", (req, res) => {})

authorsRouter.put("/:authorId", (req, res) => {})

authorsRouter.delete("/:authorId", (req, res) => {})

export default authorsRouter