"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const GeoPoint_model_1 = require("../../shared/models/GeoPoint.model");
const uuid_1 = require("uuid");
class Trip {
    constructor({ startingPos, endingPos, id = (0, uuid_1.v4)(), createdAt = new Date(), steps = [], osmEndingDetails, status = "new", personAskingAvailable, route, }) {
        this.id = id;
        this.startingPos = new GeoPoint_model_1.GeoPoint(startingPos);
        this.endingPos = new GeoPoint_model_1.GeoPoint(endingPos);
        if (typeof createdAt === "string") {
            try {
                this.createdAt = new Date(createdAt);
            }
            catch (err) {
                this.createdAt = new Date();
            }
        }
        else {
            this.createdAt = createdAt;
        }
        this.steps = steps;
        this.osmEndingDetails = osmEndingDetails;
        this.status = status;
        this.personAskingAvailable = personAskingAvailable;
        this.route = route;
    }
    toDto() {
        return {
            id: this.id,
            startingPos: this.startingPos.toDto(),
            endingPos: this.endingPos.toDto(),
            createdAt: this.createdAt.toString(),
            steps: this.steps.map((s) => s.toDto()),
            osmEndingDetails: this.osmEndingDetails,
            status: this.status,
            personAskingAvailable: this.personAskingAvailable,
            route: this.route,
        };
    }
}
exports.Trip = Trip;
