import { Schema, model } from "mongoose"

const bookSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  anio: { type: Number, required: true },
  editorial: { type: String, required: true },
  genero: { type: String, required: true },
  disponible: { type: Boolean, default: true },
}, { timestamps: false, versionKey: false })

bookSchema.set("strict", true)

const Book = model("Book", bookSchema)

export { Book }