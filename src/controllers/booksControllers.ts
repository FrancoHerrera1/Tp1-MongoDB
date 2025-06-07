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

const getBooks = async () => {
  try {
    const books = await Book.find()
    console.log(books)
  } catch (error) {
    console.log("Error al recuperar tus libros")
  }
}

//Para mostrar TODOS los libros se usa: getBooks()


//Se declara "getBookById" para obtener un libro por su id

const getBookById = async (id: string) => {
  try {
    const book = await Book.findById(id)
    if (!book) {
      console.log("Tu libro no ha sido encontrado")
    } else {
      console.log(book)
    }
  } catch (error) {
    console.log("Error al recuperar tu libro")
  }
}

//Para buscar un libro por su id se usa: getBookById("id")


//Se declara "getBookByName" para obtener un libro por su nombre

const getBookByName = async (name: string) => {
  try {
    const book = await Book.findOne({ titulo: name })
  if (!book) {
    console.log("Tu libro no ha sido encontrado")
  } else {
    console.log(book);
  }
  } catch (error) {
    console.log("Error al recuperar tu libro")
  }
};

//Para buscar un libro por su nombre se usa:  getBookByName("titulo del Libro")


//Se declara "updateBook" para buscar el libro por id y actualizarlo

const updateBook = async (id: string, body: object) => {
  try {
    const updateBook = await Book.findByIdAndUpdate(id, body, { new: true })
    if (!updateBook) {
      console.log("No se encuentra el libro")
   } else { 
    console.log(updateBook, "Tu libro ha sido actualizado!")
   }
  } catch (error) {
    console.log("Error al actualizar tu libro")
  }
}

//Para actualizar un libro se usa: updateBook("id", {titulo: "NewTitulo", anio: 2024})


// Se declara "deleteBook" para buscar el libro por id y borrarlo

const deleteBook = async (id: string) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(id)
    if (!deletedBook) {
      console.log("Libro no encontrado")
    } else {
      console.log(deletedBook, "Tu libro ha sido borrado!")
    }
  } catch (error) {
    console.log("Error al borrar tu libro")
  }
}

//Para borrar un libro por id se debe hacer: deleteBook("id")

export { createBook, getBooks, getBookByName, getBookById, updateBook, deleteBook }