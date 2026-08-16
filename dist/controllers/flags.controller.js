"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flags_1 = require("../constants/flags");
const departements_controller_1 = __importDefault(require("./departements.controller"));
class FlagsController {
    /**
     * Get the flag of the targeted departement
     * @returns the flag image url and its thumbnail url if found, else undefined
     */
    get({ departementCode, }) {
        const departement = departements_controller_1.default.get({ code: departementCode });
        if (!!!departement)
            return;
        const flag = flags_1.departementsFlags.find((f) => f.departementLibelle === departement.libelle);
        return flag;
    }
}
exports.default = new FlagsController();
