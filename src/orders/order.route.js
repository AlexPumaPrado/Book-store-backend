const express = require("express");
const { createAOrder, getOrderByEmail } = require("./order.controller");

const router = express.Router();
//create order
/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Crea una nueva orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - books
 *               - totalAmount
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *               books:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     bookId:
 *                       type: string
 *                       description: ID del libro
 *                     quantity:
 *                       type: number
 *                       description: Cantidad de libros
 *               totalAmount:
 *                 type: number
 *                 description: Monto total de la orden
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Datos inválidos en la solicitud
 *       500:
 *         description: Error del servidor
 */
router.post("/", createAOrder);
//get orders by email
/**
 * @swagger
 * /api/orders/email/{email}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Obtiene las órdenes por email del usuario
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario
 *     responses:
 *       200:
 *         description: Lista de órdenes del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: No se encontraron órdenes para este email
 *       500:
 *         description: Error del servidor
 */
router.get("/email/:email", getOrderByEmail);

module.exports = router;
