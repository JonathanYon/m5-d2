import express, { json } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs"
import uniqid from "uniqid"



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
    const author = authors.find(s => s.id = req.params.authorId)
    res.send(author)
})

authorsRouter.post("/", (req, res) => {
    // console.log(req.body)
    const newauthor = { ...req.body, id: uniqid(), createdAt: new Date() }
    const authors = JSON.parse(fs.readFileSync(jsonPath))
    authors.push(newauthor)
    fs.writeFileSync(jsonPath, JSON.stringify(authors))
    res.status(200).send({id: newauthor.id})
})

authorsRouter.put("/:authorId", (req, res) => {
    const authors = JSON.parse(fs.readFileSync(jsonPath))
    const allAuthors = authors.filter(author => author.id !== req.params.authorId)
    const updateAuthor = {...req.body, id: req.params.authorId}
    allAuthors.push(updateAuthor)
    fs.writeFileSync(jsonPath, JSON.stringify(allAuthors))
    res.send(updateAuthor)
})

authorsRouter.delete("/:authorId", (req, res) => {
   const authors = JSON.parse(fs.readFileSync(jsonPath))
   const allAuthors = authors.filter(author => author.id !== req.params.authorId)
   fs.writeFileSync(jsonPath, JSON.stringify(allAuthors))
   res.status(204).send()
})

export default authorsRouter