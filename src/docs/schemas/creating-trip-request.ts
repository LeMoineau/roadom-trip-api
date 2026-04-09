/**
 * @swagger
 * components:
 *   schemas:
 *     CreatingTripRequest:
 *       type: object
 *       required:
 *         - startingPos
 *         - distanceMax
 *       properties:
 *         startingPos:
 *           $ref: '#/components/schemas/GeoPointDto'
 *           description: Position de départ du trajet
 *         distanceMax:
 *           type: number
 *           description: Distance maximale autorisée pour le trajet
 *           example: 10000
 *         distanceMin:
 *           type: number
 *           description: Distance minimale autorisée pour le trajet (optionnel)
 *           example: 5000
 *         allowNoInformationsEnding:
 *           type: boolean
 *           description: Autorise les trajets sans informations d'arrivée précises (optionnel)
 *           example: false
 */
