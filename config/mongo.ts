import mongoose from "mongoose"


process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""

const connectDB = async () => {
 try {
  await mongoose.connect("mongodb://localhost:27017")
  console.log("Conectado a mongodb con exito!")
 } catch (error) {
   console.log("Error al conectarse a mongodb")
 }
}


export { connectDB }