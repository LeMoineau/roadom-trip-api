"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     OSMReverseResponse:
 *       type: object
 *       properties:
 *         place_id:
 *           type: number
 *           description: Identifiant du lieu OpenStreetMap
 *           example: 123456
 *         licence:
 *           type: string
 *           description: Licence du données
 *           example: "Data © OpenStreetMap contributors, ODbL 1.0. https://www.openstreetmap.org/copyright"
 *         osm_type:
 *           type: string
 *           description: Type d'objet OpenStreetMap
 *           example: "node"
 *         osm_id:
 *           type: number
 *           description: Identifiant OpenStreetMap
 *           example: 789012
 *         lat:
 *           type: string
 *           description: Latitude
 *           example: "48.8566"
 *         lon:
 *           type: string
 *           description: Longitude
 *           example: "2.3522"
 *         class:
 *           type: string
 *           description: Classe du lieu
 *           example: "highway"
 *         type:
 *           type: string
 *           description: Type du lieu
 *           example: "primary"
 *         place_rank:
 *           type: number
 *           description: Niveau de rang du lieu
 *           example: 26
 *         importance:
 *           type: number
 *           description: Importance du lieu
 *           example: 0.75
 *         addresstype:
 *           type: string
 *           description: Type d'adresse
 *           example: "road"
 *         name:
 *           type: string
 *           description: Nom du lieu
 *           example: "Tour Eiffel"
 *         display_name:
 *           type: string
 *           description: Nom affiché
 *           example: "Tour Eiffel, Paris, France"
 *         address:
 *           type: object
 *           properties:
 *             road:
 *               type: string
 *               description: Rue
 *               example: "Avenue Anatole France"
 *             village:
 *               type: string
 *               description: Village
 *               example: "Saint-Germain-en-Laye"
 *             municipality:
 *               type: string
 *               description: Municipalité
 *               example: "Paris"
 *             county:
 *               type: string
 *               description: Département
 *               example: "Paris"
 *             "ISO3166-2-lvl6":
 *               type: string
 *               description: Code ISO niveau 6
 *               example: "FR-75"
 *             state:
 *               type: string
 *               description: État
 *               example: "Île-de-France"
 *             "ISO3166-2-lvl4":
 *               type: string
 *               description: Code ISO niveau 4
 *               example: "FR-11"
 *             region:
 *               type: string
 *               description: Région
 *               example: "Île-de-France"
 *             postcode:
 *               type: string
 *               description: Code postal
 *               example: "75001"
 *             country:
 *               type: string
 *               description: Pays
 *               example: "France"
 *             country_code:
 *               type: string
 *               description: Code pays
 *               example: "fr"
 *         boundingbox:
 *           type: array
 *           items:
 *             type: string
 *           description: Coordonnées de la bbox
 *           example: ["48.8566", "48.8567", "2.3522", "2.3523"]
 *         error:
 *           type: string
 *           description: Message d'erreur (si présent)
 *           example: "No results found"
 */
