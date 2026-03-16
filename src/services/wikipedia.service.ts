import axios, { AxiosInstance } from "axios";
import config from "../config/config";

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
    //TODO: implement method
    return;
  }
}

export default new WikipediaService();
