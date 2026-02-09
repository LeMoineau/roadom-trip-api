import { departementsFlags } from "../constants/flags";
import departementsController from "../controllers/departements.controller";
import { DepartementCode } from "../shared/types/geo/Departement";

class FlagService {
  /**
   * Get the flag of the targeted departement
   * @returns the flag image url and its thumbnail url if found, else undefined
   */
  get({
    departementCode,
  }: {
    departementCode: DepartementCode;
  }): { flagURL: string; thumbURL: string } | undefined {
    const departement = departementsController.get({ code: departementCode });
    if (!!!departement) return;
    const flag = departementsFlags.find(
      (f) => f.departementLibelle === departement.libelle,
    );
    return flag;
  }
}

export default new FlagService();
