const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ReusaBook API",
      version: "1.0.0",
      description: "API for managing ReusaBooks",
      contact: {
        name: "Alexander Puma",
      }
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
      {
        url: "https://book-store-backend-1-pr9u.onrender.com",
        description: "Production",
      }
    ],
    components: {
      schemas: {
        Book: {
          type: "object",
          required: ["title", "description", "category", "Price"],
          properties: {
            _id: {
              type: "string",
              description: "ID único del libro"
            },
            title: {
              type: "string",
              description: "Título del libro"
            },
            description: {
              type: "string",
              description: "Descripción del libro"
            },
            category: {
              type: "string",
              description: "Categoría del libro"
            },
            coverImage: {
              type: "string",
              description: "URL de la imagen del libro"
            },
            Price: {
              type: "number",
              description: "Precio del libro"
            }
          }
        },
        Order: {
          type: "object",
          required: ["email", "books", "totalAmount"],
          properties: {
            _id: {
              type: "string",
              description: "ID único de la orden"
            },
            email: {
              type: "string",
              description: "Email del usuario que realizó la orden"
            },
            books: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  bookId: {
                    type: "string",
                    description: "ID del libro"
                  },
                  quantity: {
                    type: "number",
                    description: "Cantidad de libros"
                  }
                }
              },
              description: "Lista de libros en la orden"
            },
            totalAmount: {
              type: "number",
              description: "Monto total de la orden"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación de la orden"
            }
          }
        }
      }
    }
  },
  apis: ["./src/books/*.js", "./src/orders/*.js", "./src/users/*.js", "./src/stats/*.js"]
};

const specs = swaggerJsdoc(options);
module.exports = specs;
