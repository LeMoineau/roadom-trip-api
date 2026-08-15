/**
 * @swagger
 * components:
 *   schemas:
 *     TripDto:
 *       type: object
 *       required:
 *         - id
 *         - startingPos
 *         - endingPos
 *         - createdAt
 *         - steps
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: Identifiant unique du trajet
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         startingPos:
 *           $ref: '#/components/schemas/GeoPointDto'
 *           description: Position de départ du trajet
 *         endingPos:
 *           $ref: '#/components/schemas/GeoPointDto'
 *           description: Position d'arrivée du trajet
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création du trajet
 *           example: "2023-12-01T08:00:00Z"
 *         steps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/StepDto'
 *           description: Liste des étapes du trajet
 *         osmEndingDetails:
 *           $ref: '#/components/schemas/OSMReverseResponse'
 *           description: Détails OSM de la position d'arrivée (optionnel)
 *         status:
 *           type: string
 *           description: Statut du trajet
 *           example: "pending"
 *         personAskingAvailable:
 *           type: integer
 *           description: Demande d'aide disponibles (optionnel)
 *           example: 2
 */
