import { Request, Response } from "express"
import { Book } from "../models/bookModels"


//Se declara el "Create" para cargar tus libros

const createBook = async(req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body
    const newBook = new Book(body)
    const savedBook = await newBook.save()
    res.status(201).json({
      success: true,
      data: savedBook,
      message: "Libro cargado con exito!"
    })
 } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

/*Ej para Crear: 

createBook({
  titulo: "string",
  autor: "string",
  anio: number,
  editorial: "string",
  genero: "string",
  disponible: boolean,
})
*/


//Se declara "getBooks" para obtener todos los libros disponibles

const getBooks = async (req: Request, res: Response): Promise<any> => {
  try {
    const books = await Book.find()
     return res.json({
      success: true,
      data: books,
      message: "Listas de libros cargados"
    })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({
      succes: false,
      message: err.message
    })
  }
}

//Para mostrar TODOS los libros se usa: getBooks()


//Se declara "getBookById" para obtener un libro por su id

const getBookById = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body
    const book = await Book.findById(body.id)
    if (book) {
      return res.json({
      success: true,
      data: book,
      message: "Libro encontrado"
      })
    } else {
      return res.json({
      success: true,
      data: {},
      message: "Tu libro no ha sido encontrado"
      })
    }
  } catch (error) {
    const err = error as Error
    return res.status(500).json({
      succes: false,
      message: err.message
    })
  }
}

//Para buscar un libro por su id se usa: getBookById("id")


//Se declara "getBookByName" para obtener un libro por su nombre

const getBookByName = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body
    const book = await Book.findOne({ titulo: body.name })
  if (book) {
      return res.json({
      success: true,
      data: book,
      message: "Libro encontrado"
      })
    } else {
      return res.json({
      success: true,
      data: {},
      message: "Tu libro no ha sido encontrado"
      })
    }
  } catch (error) {
    const err = error as Error
    return res.status(500).json({
      succes: false,
      message: err.message
    })
  }
}

//Para buscar un libro por su nombre se usa:  getBookByName("titulo del Libro")


//Se declara "updateBook" para buscar el libro por id y actualizarlo

const updateBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id
    const body = req.body
    const updateBook = await Book.findByIdAndUpdate(id, body, { new: true })
    if (!updateBook) return res.status(404).json({ success: false, message: "not found book" })
    res.json({
      success: true,
      data: updateBook,
      message: "Tu libro ha sido actualizado!"
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

//Para actualizar un libro se usa: updateBook("id", {titulo: "NewTitulo", anio: 2024})


// Se declara "deleteBook" para buscar el libro por id y borrarlo

const deleteBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id
    const deletedBook = await Book.findByIdAndDelete(id)
    if (!deletedBook) return res.status(404).json({ sucess: false, message: "Libro no encontrado!" })
    return res.json({
      success: true,
      data: deletedBook,
      message: "Libro borrado con éxito"
    })
  } catch (error) {
    const err = error as Error
    return res.json({
      success: false,
      message: err.message
    })
  }
}

//Para borrar un libro por id se debe hacer: deleteBook("id")

export { createBook, getBooks, getBookByName, getBookById, updateBook, deleteBook }