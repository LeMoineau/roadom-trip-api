"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const departements_1 = require("../constants/departements");
class DepartementsController {
    constructor() { }
    /**
     * Get first departement from code, name of libelle.
     *
     * Warn if no departement found.
     *
     * @param props code, name and/or libelle
     * @returns Departement if found, undefined else
     */
    get({ code, name, libelle, }) {
        if (!!code && !!name && !!libelle) {
            throw new Error("must defined at least one in code, name or libelle");
        }
        const res = departements_1.departements.find((d) => d.code === code || d.name === name || d.libelle === libelle);
        if (!!!res) {
            console.warn(`no departement found for code:${code}, name:${name}, libelle:${libelle}`);
        }
        return res;
    }
}
exports.default = new DepartementsController();
