"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * components:
 *   schemas:
 *     StepDto:
 *       type: object
 *       required:
 *         - type
 *         - availableAt
 *         - reach
 *       properties:
 *         type:
 *           type: string
 *           description: Type d'étape
 *           example: "dish-hint"
 *         availableAt:
 *           type: string
 *           format: date-time
 *           description: Date et heure de disponibilité de l'étape
 *           example: "2023-12-01T10:00:00Z"
 *         reach:
 *           type: boolean
 *           description: Indique si l'étape a été atteinte
 *           example: false
 */
