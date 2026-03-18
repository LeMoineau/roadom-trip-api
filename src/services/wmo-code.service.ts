import { wmoCodes } from "../constants/wmoCodes";

const DEFAULT_WMO_ICON = "❓";
const DEFAULT_WMO_LIBELLE = "Météo inconnue";

/**
 * World Meteorological Organization code service which can attribute icon and libelle from
 * wmo code
 */
class WMOCodeService {
  getIcon(wmoCode: number) {
    if (wmoCode in wmoCodes) {
      return (wmoCodes as { [key: number]: { icon: string } })[wmoCode].icon;
    }
    return DEFAULT_WMO_ICON;
  }

  getLibelle(wmoCode: number) {
    if (wmoCode in wmoCodes) {
      return (wmoCodes as { [key: number]: { libelle: string } })[wmoCode]
        .libelle;
    }
    return DEFAULT_WMO_LIBELLE;
  }
}

export default new WMOCodeService();
