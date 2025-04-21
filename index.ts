import { connectDB } from "./config/mongo";
import mongoose, { Document, Schema } from "mongoose";

connectDB()

interface BookInterface extends Document {
  titulo: string,
  autor: string,
  anio: number,
  editorial: string,
  genero: string,
  estado: "disponible" | "agotado",
}

const bookSchema: Schema = new Schema<BookInterface>({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  anio: { type: Number, required: true },
  editorial: { type: String, required: true },
  genero: { type: String, required: true },
  estado: { type: String, enum: ["disponible", "agotado"], default: "disponible" },
}, { timestamps: false, versionKey: false })

bookSchema.set("strict", true)

const Book = mongoose.model<BookInterface>("book", bookSchema)


//Se declara el "Create" para cargar tus libros

const createBook = async(newBook: BookInterface) => {
  try {
    const book: BookInterface = new Book(newBook)

    await book.save()
    console.log("Libro cargado!")
  } catch (error) {
    console.log("Error al cargar el libro")
  }
}

//Se declara "getBooks" para obtener todos los libros disponibles

const getBooks = async () => {
  try {
    const books = await Book.find()
    console.log(books)
  } catch (error) {
    console.log("Error al recuperar tus libros")
  }
}

//Se declara "getBookById" para obtener un libro por su id

const getBookById = async (id: string) => {
  try {
    const bookId = new mongoose.Types.ObjectId("id")
    const book = await Book.findById(bookId)
    console.log(book)
  } catch (error) {
    console.log("Error al recuperar tu libro")
  }
}

//Se declara "getBookByName" para obtener un libro por su nombre

const getBookByName = async (name: string) => {
  try {
    const book = await Book.findOne({ name })
  if (!book) {
    console.log("Tu libro no ha sido encontrado")
  } else {
    console.log(book.estado);
  }
  } catch (error) {
    console.log("Error al recuperar tu libro")
  }
};

//Se declara "updateBook" para buscar el libro por id y actualizarlo

const updateBook = async (id: string, body: object) => {
  try {
    const updateBook = await Book.findByIdAndUpdate(id, body, { new: true })
    if (!updateBook) {
      console.log("No se encuentra el libro")
   } else { 
    console.log(updateBook)
   }
  } catch (error) {
    console.log("Error al actualizar tu libro")
  }
}


// Se declara "deleteBook" para buscar el libro por id y borrarlo

const deleteBook = async (id: string) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(id)
    if (!deleteBook) {
      console.log("Libro no encontrado")
    } else {
      console.log(deleteBook)
    }
  } catch (error) {
    console.log("Error al borrar tu libro")
  }
}