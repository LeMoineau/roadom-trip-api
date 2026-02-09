import { departementsBlasons } from "../constants/blasons";
import { DepartementCode } from "../shared/types/geo/Departement";

class BlasonService {
  /**
   * Get the blason of the targeted departement
   * @returns the blason image url if found, else undefined
   */
  get({
    departementCode,
  }: {
    departementCode: DepartementCode;
  }): { blasonURL: string } | undefined {
    const blason = departementsBlasons.find(
      (b) => b.departementCode === departementCode,
    );
    return blason;
  }
}

export default new BlasonService();
