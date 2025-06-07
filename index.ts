import express from "express"
import { connectDB } from "./src/config/mongo";
import { booksRoutes } from "./src/routes/booksRoutes";
import { Book } from "./src/models/bookModels";
process.loadEnvFile()

const PORT = process.env.PORT || 3000

connectDB()

const app = express()
app.use(express.json())

app.use("/api/books", booksRoutes)

app.listen(PORT, () => {
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectDB()
})

const fs = require('fs');

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
    




