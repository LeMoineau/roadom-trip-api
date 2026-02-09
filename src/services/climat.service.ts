import { climats } from "../constants/climats";
import { Climat } from "../shared/types/geo/Climat";
import { DepartementCode } from "../shared/types/geo/Departement";

class ClimatService {
  constructor() {}

  get({
    departementCode,
  }: {
    departementCode: DepartementCode;
  }): Climat | undefined {
    return climats.find((c) => c.departements.includes(departementCode))
      ?.climat;
  }
}

export default new ClimatService();
