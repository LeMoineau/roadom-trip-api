import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "AléaCarta API",
      version: "1.0.0",
      description: "API pour gérer les roat-trips de l'application AléaCarta",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Serveur de développement",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/docs/**/*.ts"],
};

export default swaggerJsDoc(options);
