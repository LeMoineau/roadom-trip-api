import { departementsFlags } from "../constants/flags";
import departementsController from "./departements.controller";
import { DepartementCode } from "../shared/types/geo/Departement";

class FlagsController {
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

export default new FlagsController();
