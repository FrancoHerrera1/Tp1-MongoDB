import { Router } from "express"
import { createBook, getBooks, getBookByName, getBookById, updateBook, deleteBook } from "../controllers/booksControllers"

const booksRoutes = Router()

// GET - http://localhost:3000/api/books/
booksRoutes.get("/", getBooks)

// GET - http://localhost:3000/api/books/:name
booksRoutes.get("/:name", getBookByName)

// GET - http://localhost:3000/api/books/id
booksRoutes.get("/:id", getBookById)

// POST - http://localhost:3000/api/books/
booksRoutes.post("/", createBook)

// PATCH - http://localhost:3000/api/books/id
booksRoutes.patch("/:id", updateBook)

// DELETE - http://localhost:3000/api/books/68233ffb3f86906f03d72a93
booksRoutes.delete("/:id", deleteBook)

export { booksRoutes }