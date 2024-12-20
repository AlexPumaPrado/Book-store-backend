const express = require("express");
const Book = require("./book.model");
const router = express.Router();
const { cloudinary, upload } = require("../utils/cloudinary");
const {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook,
} = require("./book.controller");
//const verifyAdminToken = require("../middleware/verifyAdminToken");

//frontend => baackend server =>controller=>book schema=>database=>server=>frontend

//post book
router.post("/create-book", upload.single("coverImage"), async (req, res) => {
  const { title, description, category, Price } = req.body;
  const file = req.file;
  try {
    if (file) {
      const uploadRes = await cloudinary.uploader.upload(file.path, {
        folder: "reusabooks",
      });
      if (uploadRes) {
        const book = new Book({
          title,
          description,
          category,
          coverImage: uploadRes.secure_url,
          Price,
        });
        const savedProduct = await book.save();
        res.status(200).json(savedProduct);
      }
    } else {
      res.status(400).send("No se envió una imagen.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al procesar la solicitud.");
  }
});

//get all books
/**
 * @swagger
 * /api/books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Obtiene todos los libros
 *     responses:
 *       200:
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", getAllBooks);
//get one book
/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Obtiene un libro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Detalles del libro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */

router.get("/:id", getSingleBook);

//update a book endpoint
/**
 * @swagger
 * /api/books/edit/{id}:
 *   put:
 *     tags:
 *       - Books
 *     summary: Actualiza un libro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del libro a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo título del libro
 *               description:
 *                 type: string
 *                 description: Nueva descripción del libro
 *               category:
 *                 type: string
 *                 description: Nueva categoría del libro
 *               Price:
 *                 type: number
 *                 description: Nuevo precio del libro
 *     responses:
 *       200:
 *         description: Libro actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/edit/:id", UpdateBook);

//delete book
/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Elimina un libro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del libro a eliminar
 *     responses:
 *       200:
 *         description: Libro eliminado exitosamente
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", deleteABook);

module.exports = router;
