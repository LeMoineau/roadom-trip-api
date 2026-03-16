import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import {
  WikidataClaim,
  WikidataResponse,
} from "../shared/types/wikidata/WikidataResponse";

/**
 * Service Wikidata
 * @see https://www.wikidata.org/wiki/Wikidata:Main_Page
 */
class WikidataService {
  baseURL: string;
  instance: AxiosInstance;

  constructor() {
    this.baseURL = config.getEnv().wikidataApiURL;
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
      },
    });
  }

  /**
   * Get preferred claim of a target wikidata property for target wikidata pages
   * @see https://www.wikidata.org/w/api.php?action=wbgetentities&titles=Betton&sites=frwiki&props=claims&languages=fr&format=json
   * @param titles target wikidata pages titles
   * @param property target wikidata property
   * @returns preferred wikidata claim if found, else undefined
   */
  async getWikidataProperties({
    titles,
    property,
  }: {
    titles: string;
    property: string;
  }): Promise<WikidataClaim | undefined> {
    const params = {
      action: "wbgetentities",
      titles,
      sites: "frwiki",
      props: "claims",
      languages: "fr",
      format: "json",
    };
    const data = await this.instance
      .get("/api.php", {
        params,
      })
      .then((res) => {
        if (!!!res.data || !!res.data.error) {
          console.error(
            "no data or error in data getting wikidata data for input: ",
            params,
            res.data,
          );
          return undefined;
        }
        return res.data as WikidataResponse;
      })
      .catch((err) => {
        console.error("error getting wikidata data for input: ", params, err);
        return undefined;
      });
    if (!!!data || Object.keys(data.entities).length <= 0) return;
    const entity = Object.values(data.entities)[0];
    const targetClaims = entity.claims[property];
    if (!!!targetClaims) return;
    const res = targetClaims.find((c) => c.rank === "preferred");
    if (!!res) return res;
    return targetClaims[targetClaims.length - 1];
  }

  /**
   * Get latest population of a target city
   * @param city target city
   * @returns string describing current population (ex: +12322)
   */
  async getPopulationOfCity({
    city,
  }: {
    city: string;
  }): Promise<string | undefined> {
    const populationClaim = await this.getWikidataProperties({
      titles: city,
      property: "P1082",
    });
    if (!!!populationClaim) return;
    return populationClaim.mainsnak.datavalue?.value?.amount;
  }
}

export default new WikidataService();
