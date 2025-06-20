import { Schema, model } from "mongoose"

const bookSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  anio: { type: Number },
  genero: { type: String },
  disponible: { type: Boolean, default: true },
}, { timestamps: false, versionKey: false })

bookSchema.set("strict", true)

const Book = model("Book", bookSchema)

export { Book }