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

const createBook = async () => {
  try {
    const book: BookInterface = new Book({
      titulo: "Don Quijote de la Mancha",
      autor: "Miguel de Cervantes",
      anio: 1605,
      editorial: "Francisco de Robles",
      genero: "Novela",
      estado: "disponible",
    })

    await book.save()
    console.log("Libro cargado!")
  } catch (error) {
    console.log("Error al cargar el libro")
  }
}

createBook()

