import { connect } from "mongoose"
process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""

const connectDB = async () => {
 try {
  await connect(URI_DB)
  console.log("✅ Conectado a mongodb con exito!")
 } catch (error) {
   console.log("🚫 Error al conectarse a mongodb")
 }
}


export { connectDB }