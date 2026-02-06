import { departements } from "../constants/departements";
import { Departement } from "../shared/types/geo/Departement";

export class DepartementsController {
  constructor() {}

  get({
    code,
    name,
    libelle,
  }: {
    code?: string;
    name?: string;
    libelle?: string;
  }): Departement | undefined {
    if (!!code && !!name && !!libelle) {
      throw new Error("must defined at least one in code, name or libelle");
    }
    return departements.find(
      (d) => d.code === code || d.name === name || d.libelle === libelle,
    );
  }
}

export default new DepartementsController();
