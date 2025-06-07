# 📚 Proyecto CRUD de Gestión de Librerias con MongoDB y TypeScript

Este proyecto es una pequeña aplicación en Node.js con TypeScript que permite **gestionar una base de datos de libros**. Utiliza **MongoDB** como base de datos y permite cargar libros desde un archivo `.json`, así como realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar).

---

## 🚀 Tecnologías usadas

- **Node.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Express**
- **fs (File System)** para leer archivos JSON

---

## 📁 Estructura del proyecto

```
├── dist/
├── index.ts                     # Archivo principal con lógica CRUD
├── Libros.json                  # Archivo con la data inicial de libros
├── node_modules/
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
└── src/
    ├── routes/
    │   └── booksRoutes.ts       # Definición de rutas   
    ├── config/
    │   └── mongo.ts             # Conexión a la base de datos
    ├── controllers/       
    │   └── booksControllers.ts  # Controladores
    ├── interfaces             
    │   └── Book.ts              # Interfaz del libro
    ├── models/
    │   └── bookModels.ts        # Modelo del libro
    └── utils/
        └── utilsBooks.ts        
```

---

## ✅ ¿Qué hace este proyecto?

1. **Se conecta a MongoDB**.
2. **Lee el archivo `Libros.json`** al iniciar, y si la base de datos está vacía, inserta esos libros.
3. Permite:
   - Crear un libro nuevo.
   - Obtener todos los libros cargados.
   - Buscar un libro por su ID.
   - Buscar un libro por su título.
   - Actualizar un libro por su ID.
   - Borrar un libro por su ID.

---

## 📦 Instalación

1. Cloná el repositorio o descargá los archivos.
2. Instalá las dependencias:

```bash
npm install
```

3. Crear archivo ".env" con el valor que se encuentra en ".env.example".
4. Asegurate de tener corriendo MongoDB localmente o conectarte a una instancia externa.
5. Configurá tu archivo de conexión `src/config/mongo.ts` con la URL de tu base de datos.

---

## ▶️ Ejecutar el proyecto

Para correr el proyecto en modo desarrollo:

```bash
npm run build
npm run dev
```

Esto compilará y ejecutará el proyecto con `ts-node-dev`.

---

## 🧠 ¿Cómo se usa?

Una vez ejecutado, podés usar las funciones directamente dentro del archivo `index.ts` o desde consola utilizando CURL, por ejemplo:

### Crear un nuevo libro:

```ts
createBook({
  titulo: "Nuevo libro",
  autor: "Autor Ejemplo",
  anio: 2023,
  genero: "Ficción",
});
```

---

### Obtener todos los libros:

```ts
getBooks();
```

---

### Buscar libro por ID:

```ts
getBookById("id_del_libro");
```

---

### Buscar libro por nombre:

```ts
getBookByName("El Principito");
```

---

### Actualizar libro:

```ts
updateBook("id_del_libro", { titulo: "Título actualizado", anio: 2024 });
```

---

### Borrar libro:

```ts
deleteBook("id_del_libro");
```

---

## Otra forma de utilizarlo (a través de la consola) ##

## 🧪 Endpoints disponibles (`/api/books`)

> ⚠️ Todos los endpoints se asumen corriendo en: `http://localhost:3000/api/books`

### 🔍 Obtener todos los libros

```bash
curl http://localhost:3000/api/books
```

---

### 🔍 Buscar libro por nombre

```bash
curl http://localhost:3000/api/books/Harry%20Potter
```

---

### 🔍 Buscar libro por ID

```bash
curl http://localhost:3000/api/books/ID_DEL_LIBRO
```

---

### ➕ Crear un nuevo libro

```bash
curl -X POST http://localhost:3000/api/books   -H "Content-Type: application/json"   -d '{
    "titulo": "Cien años de soledad",
    "autor": "Gabriel García Márquez",
    "anio": 1967,
    "genero": "Realismo mágico"
  }'
```

---

### ✏️ Actualizar libro por ID

```bash
curl -X PATCH http://localhost:3000/api/books/ID_DEL_LIBRO   -H "Content-Type: application/json"   -d '{
    "anio": 1980
  }'
```

---

### ❌ Eliminar libro por ID

```bash
curl -X DELETE http://localhost:3000/api/books/ID_DEL_LIBRO
```

---

## 🧾 Modelo de datos

```ts
{
  titulo: string,
  autor: string,
  anio: number,
  genero: string,
  disponible: boolean,
}
```
