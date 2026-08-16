"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blasons_1 = require("../constants/blasons");
class BlasonsController {
    /**
     * Get the blason of the targeted departement
     * @returns the blason image url if found, else undefined
     */
    get({ departementCode, }) {
        const blason = blasons_1.departementsBlasons.find((b) => b.departementCode === departementCode);
        return blason;
    }
}
exports.default = new BlasonsController();
