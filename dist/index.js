"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("./config/mongo");
const mongoose_1 = __importStar(require("mongoose"));
const fs = require('fs');
(0, mongo_1.connectDB)();
const bookSchema = new mongoose_1.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    anio: { type: Number, required: true },
    editorial: { type: String, required: true },
    genero: { type: String, required: true },
    estado: { type: String, enum: ["disponible", "agotado"], default: "disponible" },
}, { timestamps: false, versionKey: false });
bookSchema.set("strict", true);
const Book = mongoose_1.default.model("book", bookSchema);
//Funcion para cargar DB de libros del archivo "Libros.json"
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const count = yield Book.countDocuments();
        if (count === 0) {
            // Solo si no hay libros en la colección, cargamos los datos
            fs.readFile('libros.json', 'utf8', (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
                const libros = JSON.parse(data);
                try {
                    yield Book.insertMany(libros);
                    console.log('Libros insertados correctamente.');
                }
                catch (error) {
                    console.error('Error insertando libros:', error);
                }
                finally {
                }
            }));
        }
        else {
            console.log('La colección ya tiene datos. No se insertó nada.');
        }
    });
}
start();
//Se declara el "Create" para cargar tus libros
const createBook = (newBook) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new Book(newBook);
        yield book.save();
        console.log("Libro cargado!");
    }
    catch (error) {
        console.log("Error al cargar el libro");
    }
});
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
const getBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book.find();
        console.log(books);
    }
    catch (error) {
        console.log("Error al recuperar tus libros");
    }
});
//Para mostrar TODOS los libros se usa: getBooks()
//Se declara "getBookById" para obtener un libro por su id
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book.findById(id);
        if (!book) {
            console.log("Tu libro no ha sido encontrado");
        }
        else {
            console.log(book);
        }
    }
    catch (error) {
        console.log("Error al recuperar tu libro");
    }
});
//Para buscar un libro por su id se usa: getBookById("id")
//Se declara "getBookByName" para obtener un libro por su nombre
const getBookByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book.findOne({ titulo: name });
        if (!book) {
            console.log("Tu libro no ha sido encontrado");
        }
        else {
            console.log(book);
        }
    }
    catch (error) {
        console.log("Error al recuperar tu libro");
    }
});
//Para buscar un libro por su nombre se usa:  getBookByName("titulo del Libro")
//Se declara "updateBook" para buscar el libro por id y actualizarlo
const updateBook = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateBook = yield Book.findByIdAndUpdate(id, body, { new: true });
        if (!updateBook) {
            console.log("No se encuentra el libro");
        }
        else {
            console.log(updateBook, "Tu libro ha sido actualizado!");
        }
    }
    catch (error) {
        console.log("Error al actualizar tu libro");
    }
});
//Para actualizar un libro se usa: updateBook("id", {titulo: "NewTitulo", anio: 2024})
// Se declara "deleteBook" para buscar el libro por id y borrarlo
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBook = yield Book.findByIdAndDelete(id);
        if (!deletedBook) {
            console.log("Libro no encontrado");
        }
        else {
            console.log(deletedBook, "Tu libro ha sido borrado!");
        }
    }
    catch (error) {
        console.log("Error al borrar tu libro");
    }
});
//Para borrar un libro por id se debe hacer: deleteBook("id")
