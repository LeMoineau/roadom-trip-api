import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import { WikipediaResponse } from "../shared/types/wikipedia/Wikipedia";

/**
 * Wikipedia API Service
 * @see https://www.mediawiki.org/wiki/API:Query
 */
class WikipediaService {
  baseURL: string;
  instance: AxiosInstance;

  constructor() {
    this.baseURL = config.getEnv().wikipediaApiURL;
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
      },
    });
  }

  /**
   * Get the preferred paragraphe of the target wikipedia page
   * @see https://fr.wikipedia.org/w/api.php?action=query&format=json&titles=Lalleu&prop=extracts&explaintext=false&exlimit=1&redirects=1
   * @param title target wikipedia page title
   * @returns preferred paragraphe of the target wikipedia page
   */
  async getPreferredPageContentOf({
    title,
  }: {
    title: string;
  }): Promise<string | undefined> {
    const params = {
      action: "query",
      titles: title,
      prop: "extract",
      languages: "fr",
      format: "json",
      explaintext: false,
      exlimit: 1,
      redirects: 1,
    };
    const data = await this.instance
      .get("/api.php", {
        params,
      })
      .then((res) => {
        if (!!!res.data || !!res.data.error) {
          console.error(
            "no data or error in data getting wikipedia data for input: ",
            params,
            res.data,
          );
          return undefined;
        }
        return res.data as WikipediaResponse;
      })
      .catch((err) => {
        console.error("error getting wikipedia data for input: ", params, err);
        return undefined;
      });
    if (
      !!!data ||
      Object.keys(data.query.pages).filter((k) => k !== "-1").length <= 0
    )
      return;
    const page = Object.values(data.query.pages)[0];
    //TODO: finish
  }
}

export default new WikipediaService();
