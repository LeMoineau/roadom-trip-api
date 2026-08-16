"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
exports.default = (0, swagger_jsdoc_1.default)(options);
