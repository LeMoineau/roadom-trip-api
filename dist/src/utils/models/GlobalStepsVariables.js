"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalStepsVariables = void 0;
const moment_1 = __importDefault(require("moment"));
/**
 * Instance of global variables for steps factory containing :
 * - trip
 * - steps
 * - currentTime
 * - endingDetails (OSMReverseResponse)
 * - endingDepartement (Departement)
 */
class GlobalStepsVariables {
    constructor({ trip, currentTime, endingDepartement, endingWikipediaPage, }) {
        this.trip = trip;
        this.steps = [];
        this.currentTime = currentTime !== null && currentTime !== void 0 ? currentTime : new Date();
        this.endingDetails = trip.osmEndingDetails;
        this.endingDepartement = endingDepartement;
        this.endingWikipediaPage = endingWikipediaPage;
    }
    pushStep(step, props) {
        this.steps.push(step);
        if (!!!(props === null || props === void 0 ? void 0 : props.dontIncrementCurrentTime))
            this.incrementCurrentTime();
    }
    tryPushStep(stepName, step, props) {
        if (!!!step) {
            this.logStepLack(stepName);
        }
        else {
            this.pushStep(step, {
                dontIncrementCurrentTime: props === null || props === void 0 ? void 0 : props.dontIncrementCurrentTime,
            });
        }
    }
    incrementCurrentTime() {
        this.currentTime = (0, moment_1.default)(this.currentTime).add(30, "m").toDate();
    }
    logStepLack(stepName) {
        console.warn(`trip #${this.trip.id}: no ${stepName}`);
    }
}
exports.GlobalStepsVariables = GlobalStepsVariables;
