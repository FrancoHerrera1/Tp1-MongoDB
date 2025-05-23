import { connectDB } from "./config/mongo";
import mongoose, { Document, Schema } from "mongoose";
const fs = require('fs');

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


//Funcion para cargar DB de libros del archivo "Libros.json"

async function start() {

  const count = await Book.countDocuments();

  if (count === 0) {
    // Solo si no hay libros en la colección, cargamos los datos
    fs.readFile('libros.json', 'utf8', async (err: any, data: any) => {
      if (err) throw err;

      const libros = JSON.parse(data);

      try {
        await Book.insertMany(libros);
        console.log('Libros insertados correctamente.');
      } catch (error) {
        console.error('Error insertando libros:', error);
      } finally {
      }
    });
  } else {
    console.log('La colección ya tiene datos. No se insertó nada.');
  }
}

start()
    

//Se declara el "Create" para cargar tus libros

const createBook = async(newBook: object) => {
  try {
    const book: BookInterface = new Book(newBook)

    await book.save()
    console.log("Libro cargado!")
  } catch (error) {
    console.log("Error al cargar el libro")
  }
}

/*Ej para Crear: 

createBook({
  titulo: "string",
  autor: "string",
  anio: number,
  editorial: "string",
  genero: "string",
  estado: "disponible",
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


