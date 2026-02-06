import { climats } from "../constants/climats";
import { Climat } from "../shared/types/geo/Climat";
import { Departement } from "../shared/types/geo/Departement";

class ClimatService {
  constructor() {}

  get({ departement }: { departement: Departement }): Climat | undefined {
    return climats.find((c) => c.departements.includes(departement.code))
      ?.climat;
  }
}

export default new ClimatService();
