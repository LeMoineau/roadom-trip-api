"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wmoCodes_1 = require("../constants/wmoCodes");
const DEFAULT_WMO_ICON = "❓";
const DEFAULT_WMO_LIBELLE = "Météo inconnue";
/**
 * World Meteorological Organization code service which can attribute icon and libelle from
 * wmo code
 */
class WMOCodeService {
    getIcon(wmoCode) {
        if (wmoCode in wmoCodes_1.wmoCodes) {
            return wmoCodes_1.wmoCodes[wmoCode].icon;
        }
        return DEFAULT_WMO_ICON;
    }
    getLibelle(wmoCode) {
        if (wmoCode in wmoCodes_1.wmoCodes) {
            return wmoCodes_1.wmoCodes[wmoCode]
                .libelle;
        }
        return DEFAULT_WMO_LIBELLE;
    }
}
exports.default = new WMOCodeService();
